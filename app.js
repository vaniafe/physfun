/* ============================================================
   physfun.ru — портал учителя и ученика (сайт для reg.ru/VPS)
   База: Supabase (через мост api.physfun.ru)
   Версия 3: часть ученика + регистрация на сайте
   ============================================================ */

const cfg = window.PHYSFUN_CONFIG;
const sb = supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

/* --- конфигурация школ и классов (как в боте) --- */
const SCHOOLS_CONFIG = {
    "СОШ №1 г. Голицыно": ["10", "11"],
    "Маловяземская СОШ": ["9А", "9Б", "9В", "10", "11"],
};

const STATUS_LABELS = {
    pending: { text: "⏳ Ожидает", cls: "badge-pending" },
    checked: { text: "✅ Проверено", cls: "badge-checked" },
    graded:  { text: "📝 Оценено",  cls: "badge-graded" },
};

const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

/* --- состояние --- */
const state = {
    user: null,               // учитель (supabase auth)
    students: [],
    homeworks: [],
    submissions: [],
    calendar: [],
    grades: [],
    comments: [],
    unread: {},
    tab: "students",
    school: null,
    classNumber: null,
    selectedStudent: null,
    calSchool: null,
    calClass: null,
    calMonthIndex: 0,
};

/* --- состояние ученика --- */
let studentCreds = null;      // {login, password}
let studentInfo = null;       // данные ученика из student_login
let studentSubmissions = [];  // его работы

function loadStudentCreds() {
    try { studentCreds = JSON.parse(localStorage.getItem("physfun_student")); }
    catch (e) { studentCreds = null; }
}
function saveStudentCreds() {
    if (studentCreds) localStorage.setItem("physfun_student", JSON.stringify(studentCreds));
    else localStorage.removeItem("physfun_student");
}

/* ---------- утилиты ---------- */
const $ = (sel) => document.querySelector(sel);
const content = $("#content");

function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
}

function fmtDate(d) {
    if (!d) return "Без даты";
    const dt = new Date(String(d).length === 10 ? d + "T00:00:00" : d);
    return dt.toLocaleDateString("ru-RU");
}

function toast(msg, isError = false) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (isError ? " toast-error" : "");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add("hidden"), 3000);
}

function showError(msg) {
    const err = $("#login-error");
    if (!msg) { err.classList.add("hidden"); return; }
    err.textContent = msg;
    err.classList.remove("hidden");
}

function avatarHtml(url, large = false) {
    const cls = large ? "avatar-circle avatar-large" : "avatar-circle";
    const fallback = large ? "avatar-fallback avatar-large" : "avatar-fallback";
    return `<img src="${esc(url || "")}" class="${cls}" alt=""
        onerror="this.outerHTML='<div class=&quot;${fallback}&quot;>🧑‍🎓</div>'">`;
}

/* увеличенный просмотр: клик открывает, повторный клик закрывает */
function openLightbox(src) {
    if (!src) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${esc(src)}" alt="">`;
    lb.addEventListener("click", () => lb.remove());
    document.body.appendChild(lb);
}

function examLabel(classNumber) {
    const c = String(classNumber || "");
    if (c.startsWith("9")) return "ОГЭ";
    if (c.startsWith("10") || c.startsWith("11")) return "ЕГЭ";
    return null;
}

function storagePath(url, bucket) {
    if (!url) return null;
    const marker = `/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.slice(idx + marker.length).split("?")[0];
}

function academicMonths() {
    const now = new Date();
    const y0 = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
    const arr = [];
    for (let m = 8; m <= 11; m++) arr.push({ year: y0, month: m });
    for (let m = 0; m <= 4; m++) arr.push({ year: y0 + 1, month: m });
    return arr;
}

/* ============================================================
   АВТОРИЗАЦИЯ: единая форма для учителя и ученика
   ============================================================ */
$("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    showError(null);
    const login = $("#login-email").value.trim();
    const password = $("#login-password").value;

    /* 1) пробуем учителя (Supabase Auth, логин = email) */
    const { data: tData, error: tErr } = await sb.auth.signInWithPassword({
        email: login, password,
    });
    if (!tErr && tData && tData.user) return; // showApp сработает через onAuthStateChange

    /* 2) пробуем ученика (таблица students) */
    const sLogin = login.toLowerCase();
    const { data, error } = await sb.rpc("student_login", { p_login: sLogin, p_password: password });
    if (!error && data && data.length) {
        studentCreds = { login: sLogin, password };
        studentInfo = data[0];
        saveStudentCreds();
        showStudentApp();
        return;
    }
    showError("Неверный логин или пароль");
});

$("#logout-btn").addEventListener("click", async () => { await sb.auth.signOut(); });
$("#student-logout-btn").addEventListener("click", () => {
    studentCreds = null; studentInfo = null;
    saveStudentCreds();
    location.reload();
});

/* ---------- сжатие изображения перед загрузкой ---------- */
async function prepareImage(file, maxDim = 1600, quality = 0.85) {
    try {
        if (!file.type || !file.type.startsWith("image/")) return file;
        const bmp = await createImageBitmap(file);
        let w = bmp.width, h = bmp.height;
        if (Math.max(w, h) <= maxDim) { bmp.close(); return file; }
        const scale = maxDim / Math.max(w, h);
        w = Math.round(w * scale); h = Math.round(h * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
        bmp.close();
        const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
        return blob || file;
    } catch (e) { return file; }
}

/* ============================================================
   МАСТЕР РЕГИСТРАЦИИ УЧЕНИКА
   ============================================================ */
const reg = { step: 0, login: "", password: "", school: "", classNumber: "", first: "", last: "", avatarFile: null };

$("#to-register-btn").addEventListener("click", () => {
    Object.assign(reg, { step: 0, login: "", password: "", school: "", classNumber: "", first: "", last: "", avatarFile: null });
    $("#login-form").classList.add("hidden");
    renderRegStep();
});

function regBack() {
    if (reg.step === 0) {
        $("#reg-wizard").classList.add("hidden");
        $("#login-form").classList.remove("hidden");
        showError(null);
        return;
    }
    reg.step--;
    renderRegStep();
}

function renderRegStep() {
    const w = $("#reg-wizard");
    w.classList.remove("hidden");
    showError(null);
    const schools = Object.keys(SCHOOLS_CONFIG);

    if (reg.step === 0) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 1/5: Придумайте логин и пароль</div>
                <div class="reg-step-sub">Логин — латиницей, можно цифры и подчёркивание</div>
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:10px 0 6px;">Логин</label>
                <input type="text" id="reg-login" placeholder="ivanov_i" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;" autocomplete="off">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Пароль</label>
                <input type="password" id="reg-pass1" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Повторите пароль</label>
                <input type="password" id="reg-pass2" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-next">Далее ➡️</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        $("#reg-next").addEventListener("click", () => {
            const login = ($("#reg-login").value || "").trim().toLowerCase();
            const p1 = $("#reg-pass1").value || "";
            const p2 = $("#reg-pass2").value || "";
            if (!/^[a-z0-9_]{3,32}$/.test(login)) return showError("Логин: 3–32 символа, латиница, цифры, подчёркивание");
            if (p1.length < 4) return showError("Пароль должен быть не короче 4 символов");
            if (p1 !== p2) return showError("Пароли не совпадают");
            reg.login = login; reg.password = p1;
            reg.step = 1; renderRegStep();
        });
    } else if (reg.step === 1) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 2/5: Выберите школу</div>
                <div class="reg-choices">
                    ${schools.map((s) => `<button class="reg-choice" data-v="${esc(s)}">${esc(s)}</button>`).join("")}
                </div>
                <div class="reg-nav"><button class="btn" id="reg-back">⬅️ Назад</button></div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        w.querySelectorAll(".reg-choice").forEach((b) => b.addEventListener("click", () => {
            reg.school = b.dataset.v; reg.step = 2; renderRegStep();
        }));
    } else if (reg.step === 2) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 3/5: Выберите класс</div>
                <div class="reg-step-sub">${esc(reg.school)}</div>
                <div class="reg-choices">
                    ${SCHOOLS_CONFIG[reg.school].map((c) => `<button class="reg-choice" data-v="${esc(c)}">${esc(c)} класс</button>`).join("")}
                </div>
                <div class="reg-nav"><button class="btn" id="reg-back">⬅️ Назад</button></div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        w.querySelectorAll(".reg-choice").forEach((b) => b.addEventListener("click", () => {
            reg.classNumber = b.dataset.v; reg.step = 3; renderRegStep();
        }));
    } else if (reg.step === 3) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 4/5: Имя и фамилия</div>
                <div class="reg-step-sub">${esc(reg.school)}, ${esc(reg.classNumber)} класс</div>
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:10px 0 6px;">Имя</label>
                <input type="text" id="reg-first" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:var(--text-muted);margin:14px 0 6px;">Фамилия</label>
                <input type="text" id="reg-last" style="width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:10px;font-size:15px;">
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-next">Далее ➡️</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        $("#reg-next").addEventListener("click", () => {
            const f = ($("#reg-first").value || "").trim();
            const l = ($("#reg-last").value || "").trim();
            if (f.length < 2 || l.length < 2) return showError("Введите имя и фамилию (от 2 символов)");
            reg.first = f; reg.last = l;
            reg.step = 4; renderRegStep();
        });
    } else if (reg.step === 4) {
        w.innerHTML = `
            <div class="reg-steps">
                <div class="reg-step-title">Шаг 5/5: Фото профиля</div>
                <div class="reg-step-sub">${esc(reg.last)} ${esc(reg.first)}, ${esc(reg.classNumber)} класс<br>Загрузите фотографию вашего лица — так учитель вас узнает</div>
                <label class="file-drop" id="reg-avatar-drop">
                    📎 <span id="reg-avatar-label">Нажмите, чтобы выбрать фото</span>
                    <input type="file" id="reg-avatar" accept="image/*">
                </label>
                <div class="reg-nav">
                    <button class="btn" id="reg-back">⬅️ Назад</button>
                    <button class="btn btn-primary" id="reg-finish">✅ Зарегистрироваться</button>
                </div>
            </div>`;
        $("#reg-back").addEventListener("click", regBack);
        const fileInput = $("#reg-avatar");
        fileInput.addEventListener("change", () => {
            reg.avatarFile = fileInput.files[0] || null;
            $("#reg-avatar-label").textContent = reg.avatarFile ? "📷 " + reg.avatarFile.name : "Нажмите, чтобы выбрать фото";
        });
        $("#reg-finish").addEventListener("click", async () => {
            if (!reg.avatarFile) return showError("Выберите фотографию для аватарки");
            const btn = $("#reg-finish");
            btn.disabled = true; btn.textContent = "⏳ Регистрация…";
            showError(null);
            try {
                const path = `web_${reg.login}_${Date.now()}.jpg`;
                const img = await prepareImage(reg.avatarFile, 1200);
                const { error: upErr } = await sb.storage.from("avatars").upload(path, img, { contentType: "image/jpeg" });
                if (upErr) throw new Error("загрузка фото: " + upErr.message);
                const avatarUrl = sb.storage.from("avatars").getPublicUrl(path).data.publicUrl;
                const { data, error } = await sb.rpc("register_student", {
                    p_login: reg.login, p_password: reg.password,
                    p_first: reg.first, p_last: reg.last,
                    p_class: reg.classNumber, p_school: reg.school,
                    p_avatar_url: avatarUrl,
                });
                if (error) throw new Error("сохранение в базе: " + error.message);
                if (data && data.error) { showError(data.error); btn.disabled = false; btn.textContent = "✅ Зарегистрироваться"; return; }
                studentCreds = { login: reg.login, password: reg.password };
                saveStudentCreds();
                const { data: me } = await sb.rpc("student_login", { p_login: reg.login, p_password: reg.password });
                studentInfo = me[0];
                toast("Регистрация завершена!");
                showStudentApp();
            } catch (e) {
                showError("Ошибка: " + e.message);
                btn.disabled = false; btn.textContent = "✅ Зарегистрироваться";
            }
        });
    }
}

/* ============================================================
   ЧАСТЬ УЧЕНИКА
   ============================================================ */
async function showStudentApp() {
    $("#login-screen").classList.add("hidden");
    $("#app").classList.add("hidden");
    $("#student-app").classList.remove("hidden");
    await loadStudentData();
    renderStudentPage();
}

async function loadStudentData() {
    $("#student-content").innerHTML = `<div class="loading">Загрузка…</div>`;
    const [subs, dates, msgs, comms] = await Promise.all([
        sb.rpc("get_my_submissions", { p_login: studentCreds.login, p_password: studentCreds.password }),
        sb.rpc("get_class_dates", { p_school: studentInfo.school, p_class: studentInfo.class_number }),
        sb.rpc("chat_get", { p_login: studentCreds.login, p_password: studentCreds.password }),
        sb.rpc("get_my_comments", { p_login: studentCreds.login, p_password: studentCreds.password }),
    ]);
    if (subs.error || dates.error) {
        $("#student-content").innerHTML = `<div class="error-msg" style="margin:30px 0">Ошибка загрузки данных.<br>${esc(subs.error?.message || dates.error?.message || "")}</div>`;
        return;
    }
    studentSubmissions = subs.data || [];
    studentClassDates = dates.data || [];
    studentMsgs = msgs.data || [];
    studentComms = {};
    (comms.data || []).forEach((c) => { studentComms[String(c.date)] = c; });
}

let studentMsgs = [];
let studentComms = {};

let studentClassDates = [];

function renderStudentPage() {
    const c = $("#student-content");
    c.innerHTML = `
        <div class="student-hero">
            <span class="avatar-zoom" id="st-avatar-zoom" title="Нажмите, чтобы увеличить">${avatarHtml(studentInfo.avatar_url, true)}</span>
            <div>
                <h1>${esc(studentInfo.first_name)} ${esc(studentInfo.last_name)}</h1>
                <div class="profile-meta">🏫 ${esc(studentInfo.school)} &nbsp;|&nbsp; 📚 ${esc(studentInfo.class_number)} класс</div>
            </div>
        </div>

        <div id="last-teacher-msg"></div>
        <button class="btn" id="write-teacher-btn" style="width:100%;padding:14px;font-size:15px;font-weight:700;margin-bottom:20px;">✉️ Написать учителю</button>
        <button class="btn-huge" id="student-submit-btn">📸 Отправить домашнее задание</button>

        <h2 class="page-title" style="font-size:19px">📝 Мои домашние задания</h2>
        <div id="student-works"></div>
    `;

    $("#student-submit-btn").addEventListener("click", openSubmitPanel);
    const avz = $("#st-avatar-zoom");
    if (avz) avz.addEventListener("click", () => openLightbox(studentInfo.avatar_url));
    $("#write-teacher-btn").addEventListener("click", openStudentChat);
    renderLastTeacherMsg();
    renderStudentWorks();
}

function renderStudentWorks() {
    const wrap = $("#student-works");
    if (!studentSubmissions.length) {
        wrap.innerHTML = `<div class="empty-note">Вы ещё не отправляли домашние задания.<br>Нажмите кнопку «📸 Отправить домашнее задание» выше.</div>`;
        return;
    }
    /* группировка по дате сдачи, новые сверху */
    const groups = new Map();
    studentSubmissions.forEach((sub) => {
        const key = sub.due_date || (sub.submitted_at ? String(sub.submitted_at).slice(0, 10) : "Без даты");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(sub);
    });
    const sorted = [...groups.entries()].sort((a, b) => {
        if (a[0] === "Без даты") return 1;
        if (b[0] === "Без даты") return -1;
        return b[0].localeCompare(a[0]);
    });

    wrap.innerHTML = "";
    sorted.forEach(([dateKey, items]) => {
        const badge = STATUS_LABELS[items[0].status] || STATUS_LABELS.pending;
        const block = document.createElement("div");
        block.className = "work-block";
        block.innerHTML = `
            <div class="work-block-head">
                <div class="work-date">📅 ${esc(fmtDate(dateKey))}${items[0].grade ? ` &nbsp;<span class="badge badge-graded">Оценка: ${items[0].grade}</span>` : ""}</div>
                <span class="badge ${badge.cls}">${badge.text}</span>
            </div>
            ${studentComms[dateKey] ? `<div class="hw-comment"><b>💬 Комментарий учителя:</b> ${esc(studentComms[dateKey].text)}</div>` : ""}
            <div class="photos-grid">
                ${items.map((i) => photoCell(i.photo_url, "homework-photos")).join("")}
            </div>`;
        wrap.appendChild(block);
    });

    wrap.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => {
            const lb = document.createElement("div");
            lb.className = "lightbox";
            lb.innerHTML = `<img src="${img.src}">`;
            lb.addEventListener("click", () => lb.remove());
            document.body.appendChild(lb);
        }));
    wireRotateButtons(wrap, "homework-photos", true);
}

/* ---------- сдача работы ---------- */
function openSubmitPanel() {
    const today = new Date();
    const lo = new Date(today); lo.setDate(lo.getDate() - 1);
    const hi = new Date(today); hi.setDate(hi.getDate() + 5);
    const iso = (d) => d.toISOString().slice(0, 10);
    const allowed = (studentClassDates || []).filter((d) => d >= iso(lo) && d <= iso(hi));

    const c = $("#student-content");
    if (!allowed.length) {
        c.innerHTML = `
            <div class="back-row"><button class="btn" id="st-back">⬅️ Назад</button></div>
            <div class="form-card submit-panel">
                <h3>📸 Отправить домашнее задание</h3>
                <div class="empty-note">Сейчас нет доступных дат для сдачи.<br>Даты открывает учитель в календаре на сайте.</div>
            </div>`;
        $("#st-back").addEventListener("click", renderStudentPage);
        return;
    }

    c.innerHTML = `
        <div class="back-row"><button class="btn" id="st-back">⬅️ Назад</button></div>
        <div class="form-card submit-panel">
            <h3>📸 Отправить домашнее задание</h3>
            <div class="reg-step-sub">${esc(studentInfo.last_name)} ${esc(studentInfo.first_name)}, ${esc(studentInfo.class_number)} класс</div>
            <div class="reg-step-title">Шаг 1: Выберите дату сдачи</div>
            <div class="date-choice-grid" id="date-choices">
                ${allowed.map((d) => `<button class="date-choice" data-date="${d}">📅 ${fmtDate(d)}</button>`).join("")}
            </div>
            <div id="upload-zone" class="hidden">
                <div class="reg-step-title" style="margin-top:8px;">Шаг 2: Прикрепите одно или несколько фото</div>
                <label class="file-drop" id="hw-drop">
                    📎 <span id="hw-drop-label">Нажмите, чтобы выбрать фотографии</span>
                    <input type="file" id="hw-files" accept="image/*" multiple>
                </label>
                <div id="hw-progress" style="font-size:14px;color:var(--text-muted);margin-top:10px;"></div>
            </div>
        </div>`;

    $("#st-back").addEventListener("click", renderStudentPage);

    let chosenDate = null;
    $("#date-choices").querySelectorAll(".date-choice").forEach((b) =>
        b.addEventListener("click", () => {
            chosenDate = b.dataset.date;
            $("#date-choices").querySelectorAll(".date-choice").forEach((x) => {
                x.style.borderColor = x === b ? "var(--primary)" : "";
                x.style.background = x === b ? "#eef2ff" : "";
            });
            $("#upload-zone").classList.remove("hidden");
        }));

    $("#hw-files").addEventListener("change", async (e) => {
        const files = [...(e.target.files || [])];
        if (!files.length || !chosenDate) return;
        const progress = $("#hw-progress");
        let done = 0;
        for (const file of files) {
            progress.textContent = `Загрузка ${done + 1} из ${files.length}…`;
            try {
                const path = `${studentInfo.id}_${Date.now()}_${done}.jpg`;
                const img = await prepareImage(file, 2000);
                const { error: upErr } = await sb.storage.from("homework-photos")
                    .upload(path, img, { contentType: "image/jpeg" });
                if (upErr) throw new Error("загрузка фото: " + upErr.message);
                const url = sb.storage.from("homework-photos").getPublicUrl(path).data.publicUrl;
                const { data, error } = await sb.rpc("submit_homework", {
                    p_login: studentCreds.login, p_password: studentCreds.password,
                    p_due_date: chosenDate, p_photo_url: url,
                });
                if (error) throw new Error(error.message);
                if (data && data.error) throw new Error(data.error);
                done++;
            } catch (err) {
                progress.textContent = `❌ Ошибка на фото ${done + 1}: ${err.message}`;
                return;
            }
        }
        progress.textContent = `✅ Сохранено фото: ${done}.`;
        toast("Работа отправлена!");
        await loadStudentData();
        setTimeout(renderStudentPage, 800);
    });
}

/* ============================================================
   ЧАСТЬ УЧИТЕЛЯ (без изменений)
   ============================================================ */
async function loadData() {
    content.innerHTML = `<div class="loading">Загрузка…</div>`;
    const [st, hw, sub, cal, gr, cm] = await Promise.all([
        sb.from("students").select("*").order("last_name"),
        sb.from("homeworks").select("*").order("due_date", { ascending: false }),
        sb.from("submissions").select("*").order("submitted_at", { ascending: false }),
        sb.from("class_calendar").select("*"),
        sb.from("grades").select("*"),
        sb.from("hw_comments").select("*"),
    ]);
    const err = st.error || hw.error || sub.error || cal.error;
    if (err) {
        content.innerHTML = `<div class="error-msg" style="margin:30px 0">Ошибка загрузки данных.
            Проверьте config.js и что выполнены SQL-скрипты.<br>${esc(err.message)}</div>`;
        return;
    }
    state.students = st.data || [];
    state.homeworks = hw.data || [];
    state.submissions = sub.data || [];
    state.calendar = cal.data || [];
    state.grades = gr.error ? [] : (gr.data || []);      /* таблица grades появится после SQL */
    state.comments = cm.error ? [] : (cm.data || []);    /* таблица hw_comments — после SQL */
    updateBanner();
    refreshUnread();
    render();
}

function setTab(tab) {
    state.tab = tab;
    state.selectedStudent = null;
    document.querySelectorAll("#main-tabs .tab").forEach((b) =>
        b.classList.toggle("active", b.dataset.tab === tab));
    render();
}

function openStudent(id) {
    state.selectedStudent = id;
    render();
}

function render() {
    if (state.selectedStudent) return renderStudentPageT(state.selectedStudent);
    if (state.tab === "students") renderStudentsPage();
    else if (state.tab === "homeworks") renderHomeworksPage();
    else if (state.tab === "calendar") renderCalendarPage();
    else if (state.tab === "grades") renderGradesPage();
    else if (state.tab === "messages") renderMessagesPage();
    else if (state.tab === "stats") renderStatsPage();
}

/* ---------- ученики (учитель) ---------- */
function renderStudentsPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.school || !SCHOOLS_CONFIG[state.school]) state.school = schools[0];
    if (!state.classNumber || !SCHOOLS_CONFIG[state.school].includes(state.classNumber)) {
        state.classNumber = SCHOOLS_CONFIG[state.school][0];
    }
    const classes = SCHOOLS_CONFIG[state.school];
    const list = state.students.filter(
        (s) => s.school === state.school && s.class_number === state.classNumber);

    content.innerHTML = `
        <h2 class="page-title">👨‍🎓 Ученики</h2>
        <div class="sub-tabs" id="school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.school ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="class-tabs">
            ${classes.map((c) => `<button class="sub-tab ${c === state.classNumber ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        <p class="count-note">👥 Всего: ${list.length} учеников</p>
        <button class="btn" id="class-msg-btn" style="margin-bottom:14px;">📨 Отправить сообщение классу</button>
        <div id="class-msg-form" class="form-card hidden" style="max-width:560px;">
            <h3>📨 Сообщение для ${esc(state.classNumber)} класса</h3>
            <textarea id="class-msg-text" rows="3" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;font-family:inherit;font-size:14px;" placeholder="Текст сообщения всем ученикам класса..."></textarea>
            <button class="btn btn-primary" id="class-msg-send" style="margin-top:10px;">📨 Отправить</button>
        </div>
        <button class="btn" id="class-history-btn" style="margin-bottom:14px;">🕘 История сообщений</button>
        <div id="class-history" class="hidden" style="max-width:640px;margin-bottom:16px;"></div>
        <div class="students-grid" id="students-grid"></div>`;

    document.querySelectorAll("#school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.school = b.dataset.school; renderStudentsPage(); }));
    document.querySelectorAll("#class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.classNumber = b.dataset.class; renderStudentsPage(); }));

    const grid = $("#students-grid");
    if (!list.length) {
        grid.innerHTML = `<div class="empty-note" style="grid-column:1/-1">В этом классе пока нет учеников.<br>Ученики регистрируются через бота или кнопку «Зарегистрироваться» на сайте.</div>`;
        return;
    }
    grid.innerHTML = list.map((s) => `
        <div class="student-card" data-id="${s.id}">
            <div class="unread-dot ${state.unread[s.id] ? "" : "hidden"}" data-uid="${s.id}">${state.unread[s.id] || ""}</div>
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
            ${s.needs_avatar_update ? `<div class="card-photo-flag">📸 Требуется фото</div>` : ""}
        </div>`).join("");
    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));

    const cmb = $("#class-msg-btn");
    if (cmb) cmb.addEventListener("click", () => $("#class-msg-form").classList.toggle("hidden"));
    const cms = $("#class-msg-send");
    if (cms) cms.addEventListener("click", async () => {
        const text = ($("#class-msg-text").value || "").trim();
        if (!text) return toast("Введите текст сообщения", true);
        cms.disabled = true;
        let sent = 0;
        for (const s of list) {
            const { error } = await sb.from("messages").insert({
                student_id: s.id, sender: "teacher",
                text: "Сообщение всему классу: " + text,
            });
            if (!error) sent++;
        }
        cms.disabled = false;
        $("#class-msg-text").value = "";
        $("#class-msg-form").classList.add("hidden");
        toast(`Отправлено ${sent} ученикам класса`);
    });

    /* История сообщений классу (рассылки) */
    const chb = $("#class-history-btn");
    if (chb) chb.addEventListener("click", async () => {
        const box = $("#class-history");
        box.classList.toggle("hidden");
        if (box.classList.contains("hidden")) return;
        await loadClassHistory(box, list);
    });
}

/* ---------- история рассылок классу ---------- */
const BROADCAST_PREFIX = "Сообщение всему классу: ";

async function loadClassHistory(box, list) {
    box.innerHTML = `<div class="form-card"><div class="loading">Загрузка…</div></div>`;
    const ids = list.map((s) => s.id);
    const { data, error } = await sb.from("messages").select("id,text,created_at")
        .eq("sender", "teacher").in("student_id", ids)
        .like("text", BROADCAST_PREFIX + "%")
        .order("created_at", { ascending: false });
    if (error) {
        box.innerHTML = `<div class="error-msg" style="margin:0">Ошибка: ${esc(error.message)}</div>`;
        return;
    }
    /* одна рассылка = запись на каждого ученика — группируем; новые сверху */
    const groups = new Map();
    (data || []).forEach((m) => {
        const key = m.text + "|" + String(m.created_at).slice(0, 10);
        if (!groups.has(key)) groups.set(key, { text: m.text, created_at: m.created_at, ids: [] });
        groups.get(key).ids.push(m.id);
    });
    const rows = [...groups.values()];
    box.innerHTML = `<div class="form-card">
        <h3>🕘 История сообщений классу</h3>
        ${rows.length ? rows.map((m) => {
            const body = m.text.startsWith(BROADCAST_PREFIX) ? m.text.slice(BROADCAST_PREFIX.length) : m.text;
            const key = m.text + "|" + String(m.created_at).slice(0, 10);
            return `
                <div class="hist-row">
                    <div class="hist-date">
                        <span>📅 ${esc(fmtDate(String(m.created_at).slice(0, 10)))} · ${esc(fmtTime(m.created_at))}</span>
                        <button class="btn btn-sm btn-danger hist-del" data-key="${esc(key)}" title="Удалить из истории">🗑</button>
                    </div>
                    <div class="hist-text">${esc(body)}</div>
                </div>`;
        }).join("")
        : `<div class="empty-note">Сообщений классу пока не было.</div>`}
    </div>`;

    box.querySelectorAll(".hist-del").forEach((b) =>
        b.addEventListener("click", async () => {
            const g = groups.get(b.dataset.key);
            if (!g) return;
            if (!confirm("Удалить это сообщение из истории?\n(В чатах учеников оно останется)")) return;
            const { error: delErr } = await sb.from("messages").delete().in("id", g.ids);
            if (delErr) return toast("Ошибка: " + delErr.message, true);
            toast("Сообщение удалено из истории");
            await loadClassHistory(box, list);
        }));
}

/* ---------- страница ученика (учитель) ---------- */
function homeworkById(id) {
    return state.homeworks.find((h) => h.id === id);
}

function groupSubmissions(studentId) {
    const groups = new Map();
    state.submissions.filter((s) => s.student_id === studentId).forEach((sub) => {
        const hw = homeworkById(sub.homework_id);
        const key = sub.due_date
            || hw?.due_date
            || (sub.submitted_at ? String(sub.submitted_at).slice(0, 10) : null)
            || "Без даты";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(sub);
    });
    return [...groups.entries()].sort((a, b) => (a[0] === "Без даты" ? -1 : b[0] === "Без даты" ? 1 : b[0].localeCompare(a[0])));
}

async function deleteStudent(student) {
    const subs = state.submissions.filter((s) => s.student_id === student.id);
    const avatarPath = storagePath(student.avatar_url, "avatars");
    if (avatarPath) { try { await sb.storage.from("avatars").remove([avatarPath]); } catch (e) {} }
    const photoPaths = subs.map((s) => storagePath(s.photo_url, "homework-photos")).filter(Boolean);
    if (photoPaths.length) { try { await sb.storage.from("homework-photos").remove(photoPaths); } catch (e) {} }
    const { error } = await sb.from("students").delete().eq("id", student.id);
    if (error) return toast("Ошибка удаления: " + error.message, true);
    state.students = state.students.filter((s) => s.id !== student.id);
    state.submissions = state.submissions.filter((s) => s.student_id !== student.id);
    state.grades = state.grades.filter((g) => g.student_id !== student.id);
    state.selectedStudent = null;
    toast("Ученик удалён");
    render();
}

function renderStudentPageT(studentId) {
    const st = state.students.find((s) => s.id === studentId);
    if (!st) { state.selectedStudent = null; return render(); }
    const subs = state.submissions.filter((s) => s.student_id === studentId);
    const groups = groupSubmissions(studentId);
    const exam = examLabel(st.class_number);

    content.innerHTML = `
        <div class="back-row"><button class="btn" id="back-btn">← Назад к списку</button></div>
        <div class="profile-header">
            <span class="avatar-zoom" id="t-avatar-zoom" title="Нажмите, чтобы увеличить">${avatarHtml(st.avatar_url, true)}</span>
            <div>
                <h1>${esc(st.last_name)} ${esc(st.first_name)}</h1>
                <div class="profile-meta">🏫 ${esc(st.school)} &nbsp;|&nbsp; 📚 ${esc(st.class_number)} класс</div>
                <div class="profile-count">Всего работ: ${subs.length}${st.login ? ` &nbsp;|&nbsp; 🔑 ${esc(st.login)}` : ""}</div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-delete" id="delete-btn">🗑 Удалить ученика</button>
            </div>
        </div>
        <label class="flag-row">
            <input type="checkbox" id="photo-flag" ${st.needs_avatar_update ? "checked" : ""}>
            Сменить фото профиля
        </label>
        ${exam ? `
        <label class="flag-row">
            <input type="checkbox" id="exam-flag" ${st.exam_flag ? "checked" : ""}>
            ${exam === "ОГЭ" ? "📘 ОГЭ" : "🎓 ЕГЭ"}
        </label>` : ""}
        <button class="btn" id="chat-btn-2" style="width:100%;padding:14px;font-size:15px;font-weight:700;margin-bottom:16px;">💬 Чат с учеником <span id="chat-badge-2" class="badge-unread ${state.unread[studentId] ? "" : "hidden"}">${state.unread[studentId] || ""}</span></button>
        <h2 class="page-title" style="font-size:19px">📸 Домашние задания</h2>
        <div id="works"></div>`;

    $("#back-btn").addEventListener("click", () => { state.selectedStudent = null; render(); });
    const avz = $("#t-avatar-zoom");
    if (avz) avz.addEventListener("click", () => openLightbox(st.avatar_url));
    const chatBtn2 = $("#chat-btn-2");
    if (chatBtn2) chatBtn2.addEventListener("click", () => toggleTeacherChat(studentId, st.last_name + " " + st.first_name));
    $("#delete-btn").addEventListener("click", async () => {
        const ok = confirm(`Удалить ученика ${st.last_name} ${st.first_name}?\n\nБудут удалены: профиль, аватарка и ${subs.length} работ.\nДействие необратимо!`);
        if (!ok) return;
        $("#delete-btn").disabled = true;
        $("#delete-btn").textContent = "⏳ Удаление…";
        await deleteStudent(st);
    });
    $("#photo-flag").addEventListener("change", async (e) => {
        const { error } = await sb.from("students").update({ needs_avatar_update: e.target.checked }).eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else { st.needs_avatar_update = e.target.checked; toast("Сохранено"); }
    });
    const examBox = $("#exam-flag");
    if (examBox) examBox.addEventListener("change", async (e) => {
        const { error } = await sb.from("students").update({ exam_flag: e.target.checked }).eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else { st.exam_flag = e.target.checked; toast("Сохранено"); }
    });

    const works = $("#works");
    if (!groups.length) {
        works.innerHTML = `<div class="empty-note">Ученик пока не отправлял домашние задания.</div>`;
        return;
    }
    groups.forEach(([dateKey, items]) => {
        const statuses = items.map((i) => i.status);
        const grades = items.map((i) => i.grade).filter((g) => g != null);
        const groupStatus = statuses.every((s) => s === statuses[0]) ? statuses[0] : "pending";
        const groupGrade = grades.length && grades.every((g) => g === grades[0]) ? grades[0] : null;
        const badge = STATUS_LABELS[groupStatus] || STATUS_LABELS.pending;
        const hw = homeworkById(items[0].homework_id);
        const block = document.createElement("div");
        block.className = "work-block";
        block.innerHTML = `
            <div class="work-block-head">
                <div>
                    <div class="work-date">📅 ${esc(fmtDate(dateKey))}</div>
                    ${hw && hw.title ? `<div style="font-size:13px;color:var(--text-muted);margin-top:3px">${esc(hw.title)}${hw.textbook_reference ? " · " + esc(hw.textbook_reference) : ""}</div>` : ""}
                </div>
                <span class="badge ${badge.cls}">${badge.text}</span>
                <button class="btn btn-sm" data-comment="${esc(dateKey)}">💬 ${state.comments.some((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted) ? "Комментарий" : "Отправить комментарий"}</button>
            </div>
            <div class="photos-grid">
                ${items.map((i) => photoCell(i.photo_url, "homework-photos")).join("")}
            </div>
            ${commentHtmlT(studentId, dateKey)}
            <div class="work-controls">
                <div class="control-field">
                    <label>Проверено</label>
                    <input type="checkbox" class="chk-checked" ${groupStatus !== "pending" ? "checked" : ""}>
                </div>
                <div class="control-field">
                    <label>Оценка</label>
                    <select class="sel-grade">
                        <option value="">—</option>
                        ${[5, 4, 3, 2, 1].map((g) => `<option value="${g}" ${groupGrade === g ? "selected" : ""}>${g}</option>`).join("")}
                    </select>
                </div>
                <button class="btn btn-primary btn-save">💾 Сохранить</button>
            </div>`;
        block.querySelector(".btn-save").addEventListener("click", async () => {
            const checked = block.querySelector(".chk-checked").checked;
            const gradeVal = block.querySelector(".sel-grade").value;
            const grade = gradeVal === "" ? null : parseInt(gradeVal, 10);
            const status = checked ? (grade ? "graded" : "checked") : "pending";
            const ids = items.map((i) => i.id);
            const { error } = await sb.from("submissions").update({ status, grade }).in("id", ids);
            if (error) return toast("Ошибка сохранения: " + error.message, true);
            items.forEach((i) => { i.status = status; i.grade = grade; });
            /* синхронизация с таблицей оценок (вкладка "Оценки") */
            try {
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
                    if (grade) {
                        const { data: gRows } = await sb.from("grades").upsert(
                            { student_id: studentId, date: dateKey, mark: String(grade) },
                            { onConflict: "student_id,date" }).select();
                        const row = (gRows && gRows[0]) || null;
                        const gi = state.grades.findIndex((g) => g.student_id === studentId && g.date === dateKey);
                        if (row) {
                            if (gi >= 0) state.grades[gi] = row;
                            else state.grades.push(row);
                        } else if (gi >= 0) state.grades[gi].mark = String(grade);
                        else state.grades.push({ student_id: studentId, date: dateKey, mark: String(grade), in_journal: false });
                    } else {
                        await sb.from("grades").delete().eq("student_id", studentId).eq("date", dateKey);
                        state.grades = state.grades.filter((g) => !(g.student_id === studentId && g.date === dateKey));
                    }
                }
            } catch (e) { /* таблицы grades ещё нет — не мешаем сохранению */ }
            toast("Сохранено!");
            renderStudentPageT(studentId);
        });
        works.appendChild(block);
    });
    works.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => openLightbox(img.src)));
    wireRotateButtons(works, "homework-photos");

    works.querySelectorAll("[data-comment]").forEach((b) =>
        b.addEventListener("click", () => openCommentModal(studentId, b.dataset.comment)));
    works.querySelectorAll("[data-edit-comment]").forEach((b) =>
        b.addEventListener("click", () => openCommentModal(studentId, b.dataset.editComment)));
    works.querySelectorAll("[data-del-comment]").forEach((b) =>
        b.addEventListener("click", () => deleteComment(studentId, b.dataset.delComment)));
}

/* ---------- календарь (учитель) ---------- */
function renderCalendarPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.calSchool || !SCHOOLS_CONFIG[state.calSchool]) state.calSchool = schools[0];
    if (!state.calClass || !SCHOOLS_CONFIG[state.calSchool].includes(state.calClass)) {
        state.calClass = SCHOOLS_CONFIG[state.calSchool][0];
    }
    const months = academicMonths();
    if (state.calMonthIndex < 0) state.calMonthIndex = 0;
    if (state.calMonthIndex > months.length - 1) state.calMonthIndex = months.length - 1;
    const { year, month } = months[state.calMonthIndex];

    const marked = new Set(
        state.calendar.filter((r) => r.school === state.calSchool && r.class_number === state.calClass).map((r) => r.date));

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const todayStr = new Date().toISOString().slice(0, 10);

    let cells = "";
    for (let i = 0; i < firstOffset; i++) cells += `<button class="cal-day cal-empty" disabled></button>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const classes = ["cal-day"];
        if (marked.has(dateStr)) classes.push("marked");
        if (dateStr === todayStr) classes.push("today");
        cells += `<button class="${classes.join(" ")}" data-date="${dateStr}">${d}</button>`;
    }

    content.innerHTML = `
        <h2 class="page-title">🗓️ Календарь сдачи работ</h2>
        <div class="sub-tabs" id="cal-school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.calSchool ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="cal-class-tabs">
            ${SCHOOLS_CONFIG[state.calSchool].map((c) => `<button class="sub-tab ${c === state.calClass ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        <div class="form-card calendar-card">
            <div class="cal-header">
                <button class="cal-nav" id="cal-prev" ${state.calMonthIndex === 0 ? "disabled" : ""}>‹</button>
                <div class="cal-title">${MONTHS_RU[month].toLowerCase()} ${year}</div>
                <button class="cal-nav" id="cal-next" ${state.calMonthIndex === months.length - 1 ? "disabled" : ""}>›</button>
            </div>
            <div class="cal-grid">
                ${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((w, i) => `<div class="cal-weekday ${i >= 5 ? "weekend" : ""}">${w}</div>`).join("")}
                ${cells}
            </div>
            <div class="cal-hint">
                💡 Нажмите на число, чтобы отметить его как день сдачи (ещё раз — снять). Отмечено: <strong>${marked.size}</strong>.
                Эти даты ученики выбирают в боте и на сайте.
            </div>
        </div>`;

    document.querySelectorAll("#cal-school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.calSchool = b.dataset.school; renderCalendarPage(); }));
    document.querySelectorAll("#cal-class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.calClass = b.dataset.class; renderCalendarPage(); }));
    $("#cal-prev").addEventListener("click", () => { state.calMonthIndex--; renderCalendarPage(); });
    $("#cal-next").addEventListener("click", () => { state.calMonthIndex++; renderCalendarPage(); });

    content.querySelectorAll(".cal-day[data-date]").forEach((btn) =>
        btn.addEventListener("click", async () => {
            const dateStr = btn.dataset.date;
            const existing = state.calendar.find((r) =>
                r.school === state.calSchool && r.class_number === state.calClass && r.date === dateStr);
            if (existing) {
                const { error } = await sb.from("class_calendar").delete().eq("id", existing.id);
                if (error) return toast("Ошибка: " + error.message, true);
                state.calendar = state.calendar.filter((r) => r.id !== existing.id);
            } else {
                const { data, error } = await sb.from("class_calendar")
                    .insert({ school: state.calSchool, class_number: state.calClass, date: dateStr }).select();
                if (error) return toast("Ошибка: " + error.message, true);
                state.calendar.push(data[0]);
            }
            renderCalendarPage();
        }));
}

/* ---------- баннер "заполните календарь" ---------- */
function updateBanner() {
    const el = $("#teacher-banner");
    if (!el) return;
    const limit = new Date();
    limit.setDate(limit.getDate() + 7);
    const iso = (d) => d.toISOString().slice(0, 10);
    const pairs = [];
    Object.entries(SCHOOLS_CONFIG).forEach(([school, classes]) =>
        classes.forEach((cls) => pairs.push({ school, cls })));
    const need = pairs.some(({ school, cls }) => {
        const dates = state.calendar
            .filter((r) => r.school === school && r.class_number === cls)
            .map((r) => r.date);
        if (!dates.length) return true;                       /* календарь пуст */
        return dates.reduce((a, b) => (b > a ? b : a)) < iso(limit);
    });
    el.classList.toggle("hidden", !need);
}

/* ---------- вкладка "Оценки" (учитель) ---------- */
let gradeSel = null;     /* выбранная клетка {sid, date} */
let journalMode = false; /* режим выбора "в журнал" */

function gradeFor(sid, date) {
    return state.grades.find((g) => g.student_id === sid && g.date === date);
}

function gradeEditorHtml() {
    const st = state.students.find((s) => s.id === gradeSel.sid);
    if (!st) return "";
    const g = gradeFor(gradeSel.sid, gradeSel.date);
    return `
        <div class="control-field" style="flex:1;min-width:220px;">
            <label>${esc(st.last_name)} ${esc(st.first_name)} · ${fmtDate(gradeSel.date)}${g ? ` · сейчас: <b>${esc(g.mark)}</b>${g.in_journal ? " (в журнале)" : ""}` : " · без оценки"}</label>
        </div>
        <div class="control-field">
            <label>Оценка</label>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${["5", "4", "3", "2", "1", "н"].map((m) => `<button class="btn btn-sm" data-mark="${m}">${m}</button>`).join("")}
                <button class="btn btn-sm btn-danger" data-mark="" title="Удалить оценку">✖</button>
            </div>
        </div>`;
}

function renderGradesPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.school || !SCHOOLS_CONFIG[state.school]) state.school = schools[0];
    if (!state.classNumber || !SCHOOLS_CONFIG[state.school].includes(state.classNumber)) {
        state.classNumber = SCHOOLS_CONFIG[state.school][0];
    }
    const dates = state.calendar
        .filter((r) => r.school === state.school && r.class_number === state.classNumber)
        .map((r) => r.date).sort();
    const list = state.students
        .filter((s) => s.school === state.school && s.class_number === state.classNumber)
        .sort((a, b) => a.last_name.localeCompare(b.last_name, "ru"));

    let rows = "";
    list.forEach((s) => {
        let tds = `<td class="g-name g-link" data-open="${s.id}" title="Открыть работы ученика">${esc(s.last_name)} ${esc(s.first_name)}</td>`;
        dates.forEach((d) => {
            const g = gradeFor(s.id, d);
            const subs = state.submissions.filter((x) => x.student_id === s.id && x.due_date === d);
            let cls = "g-cell", txt = "";
            if (g) { txt = esc(g.mark); cls += g.in_journal ? " g-green" : " g-blue"; }
            else if (subs.length) cls += subs.some((x) => x.status !== "pending") ? " g-blue" : " g-gray";
            else cls += " g-white";
            const sel = (gradeSel && gradeSel.sid === s.id && gradeSel.date === d) ? " g-sel" : "";
            tds += `<td class="${cls}${sel}" data-sid="${s.id}" data-date="${d}">${txt}</td>`;
        });
        rows += `<tr>${tds}</tr>`;
    });

    content.innerHTML = `
        <h2 class="page-title">✔️ Оценки</h2>
        <div class="sub-tabs" id="gr-school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.school ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="gr-class-tabs">
            ${SCHOOLS_CONFIG[state.school].map((c) => `<button class="sub-tab ${c === state.classNumber ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        ${!dates.length ? `
        <div class="form-card">
            <div class="empty-note">Для этого класса в календаре нет отмеченных дат.<br>Заполните календарь — здесь появится таблица.</div>
        </div>` : `
        <div class="grades-wrap">
            <table class="grades-table">
                <thead><tr>
                    <th class="g-name">Обучающийся</th>
                    ${dates.map((d) => `<th>${d.slice(8)}.${d.slice(5, 7)}</th>`).join("")}
                </tr></thead>
                <tbody>${rows || `<tr><td class="g-name" colspan="${dates.length + 1}">В классе нет учеников</td></tr>`}</tbody>
            </table>
        </div>
        <div id="grade-editor" class="${gradeSel ? "work-controls" : "hidden"}"
             style="background:var(--card);border-radius:12px;padding:14px;margin-top:14px;box-shadow:var(--shadow);">
            ${gradeSel ? gradeEditorHtml() : ""}
        </div>
        <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
            <button class="btn ${journalMode ? "btn-primary" : ""}" id="journal-btn">${journalMode ? "✅ Готово" : "🖊 Выставить в журнал"}</button>
            <span class="grades-hint">${journalMode
                ? "Режим выбора: нажимайте на клетки с оценками — они станут зелёными (отметка «внесено в журнал»). Повторный клик снимает отметку."
                : "Нажмите на клетку, чтобы выставить оценку или «н» за эту дату (даже если работа не прислана)."}</span>
        </div>`}`;

    document.querySelectorAll("#gr-school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.school = b.dataset.school; gradeSel = null; renderGradesPage(); }));
    document.querySelectorAll("#gr-class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.classNumber = b.dataset.class; gradeSel = null; renderGradesPage(); }));

    content.querySelectorAll("[data-open]").forEach((td) =>
        td.addEventListener("click", () => openStudent(td.dataset.open)));

    content.querySelectorAll("td.g-cell").forEach((td) =>
        td.addEventListener("click", async () => {
            const sid = td.dataset.sid, date = td.dataset.date;
            if (journalMode) {
                const g = gradeFor(sid, date);
                if (!g) return toast("В этой клетке нет оценки", true);
                const { error } = await sb.from("grades").update({ in_journal: !g.in_journal })
                    .eq("student_id", sid).eq("date", date);
                if (error) return toast("Ошибка: " + error.message, true);
                g.in_journal = !g.in_journal;
                renderGradesPage();
                return;
            }
            gradeSel = { sid, date };
            renderGradesPage();
        }));

    const editor = $("#grade-editor");
    if (editor && gradeSel) {
        editor.querySelectorAll("[data-mark]").forEach((b) =>
            b.addEventListener("click", async () => {
                const mark = b.dataset.mark;
                if (!gradeSel) return;
                if (mark === "") {
                    const { error } = await sb.from("grades").delete()
                        .eq("student_id", gradeSel.sid).eq("date", gradeSel.date);
                    if (error) return toast("Ошибка: " + error.message, true);
                    state.grades = state.grades.filter((g) => !(g.student_id === gradeSel.sid && g.date === gradeSel.date));
                } else {
                    const { data: gRows, error } = await sb.from("grades").upsert(
                        { student_id: gradeSel.sid, date: gradeSel.date, mark },
                        { onConflict: "student_id,date" }).select();
                    if (error) return toast("Ошибка: " + error.message, true);
                    const row = (gRows && gRows[0]) || null;
                    const gi2 = state.grades.findIndex((g) => g.student_id === gradeSel.sid && g.date === gradeSel.date);
                    if (row) {
                        if (gi2 >= 0) state.grades[gi2] = row;
                        else state.grades.push(row);
                    } else if (gi2 >= 0) state.grades[gi2].mark = mark;
                    else state.grades.push({ student_id: gradeSel.sid, date: gradeSel.date, mark, in_journal: false });
                }
                toast("Сохранено");
                renderGradesPage();
            }));
    }

    const jbtn = $("#journal-btn");
    if (jbtn) jbtn.addEventListener("click", () => {
        journalMode = !journalMode;
        gradeSel = null;
        renderGradesPage();
    });
}

/* ============================================================
   ЧАТ учитель <-> ученик + комментарии к работам
   ============================================================ */
function fmtTime(d) {
    return new Date(d).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/* ---------- непрочитанные (для учителя) ---------- */
let unreadTimerStarted = false;

async function refreshUnread() {
    try {
        const { data } = await sb.from("messages").select("student_id")
            .eq("sender", "student").is("read_at", null).eq("deleted", false);
        const map = {};
        (data || []).forEach((r) => { map[r.student_id] = (map[r.student_id] || 0) + 1; });
        state.unread = map;
        updateBadges();
    } catch (e) { /* таблицы messages ещё нет */ }
}

function startUnreadTimer() {
    if (unreadTimerStarted) return;
    unreadTimerStarted = true;
    setInterval(refreshUnread, 30000);
}

function updateBadges() {
    document.querySelectorAll("[data-uid]").forEach((el) => {
        const n = state.unread[el.dataset.uid] || 0;
        el.classList.toggle("hidden", !n);
        el.textContent = n ? String(n) : "";
    });
    const n = state.unread[state.selectedStudent] || 0;
    ["#chat-badge", "#chat-badge-2"].forEach((sel) => {
        const b = $(sel);
        if (b) {
            b.textContent = n || "";
            b.classList.toggle("hidden", !n);
        }
    });

    /* общий счётчик непрочитанных на вкладке «Сообщения» */
    const total = Object.values(state.unread).reduce((a, b) => a + b, 0);
    const tabBadge = $("#msg-tab-badge");
    if (tabBadge) {
        tabBadge.textContent = total || "";
        tabBadge.classList.toggle("hidden", !total);
    }

    /* если открыта вкладка «Сообщения» — перерисуем список (плашки исчезают по мере прочтения) */
    if (state.user && state.tab === "messages" && !state.selectedStudent && !$("#inline-chat")) {
        renderMessagesPage();
    }
}

/* ---------- поворот фото работ ---------- */
async function rotatePhotoFile(url, bucket) {
    const path = storagePath(url, bucket);
    if (!path) throw new Error("не удалось определить путь файла");
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise((ok, bad) => {
        img.onload = ok;
        img.onerror = () => bad(new Error("не удалось загрузить фото"));
        img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2); /* 90° по часовой */
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    const blob = await new Promise((ok) => canvas.toBlob(ok, "image/jpeg", 0.92));
    if (!blob) throw new Error("ошибка обработки изображения");
    const { error } = await sb.storage.from(bucket).upload(path, blob, { upsert: true, contentType: "image/jpeg" });
    if (error) throw new Error(error.message);
}

function photoCell(url, bucket) {
    return `<div class="photo-wrap" data-purl="${esc(url)}">`
        + `<img src="${esc(url)}" alt="Работа" loading="lazy">`
        + `<button class="rotate-btn" type="button" title="Повернуть на 90° по часовой">↻</button>`
        + `</div>`;
}

function wireRotateButtons(container, bucket, isStudent = false) {
    container.querySelectorAll(".rotate-btn").forEach((b) =>
        b.addEventListener("click", async (e) => {
            e.stopPropagation();
            const wrap = b.closest(".photo-wrap");
            const url = wrap.dataset.purl;
            b.disabled = true;
            const old = b.textContent;
            b.textContent = "⏳";
            try {
                await rotatePhotoFile(url, bucket);
                /* новый адрес с меткой версии — CDN отдаст свежий файл всем сразу */
                const base = url.split("?")[0];
                const newUrl = base + "?v=" + Date.now();
                if (isStudent) {
                    const { data: r } = await sb.rpc("rotate_my_photo", {
                        p_login: studentCreds.login, p_password: studentCreds.password,
                        p_old_url: url, p_new_url: newUrl,
                    });
                    if (r && r.error) throw new Error(r.error);
                    (typeof studentSubmissions !== "undefined" ? studentSubmissions : []).forEach((s) => {
                        if (String(s.photo_url).split("?")[0] === base) s.photo_url = newUrl;
                    });
                } else {
                    const { error: upErr } = await sb.from("submissions")
                        .update({ photo_url: newUrl }).like("photo_url", base + "*");
                    if (upErr) throw new Error(upErr.message);
                    (state.submissions || []).forEach((s) => {
                        if (String(s.photo_url).split("?")[0] === base) s.photo_url = newUrl;
                    });
                }
                container.querySelectorAll(".photo-wrap").forEach((w) => {
                    if (w.dataset.purl === url) {
                        w.dataset.purl = newUrl;
                        w.querySelector("img").src = newUrl;
                    }
                });
                toast("Фото повёрнуто на 90°");
            } catch (err) {
                toast("Ошибка: " + err.message, true);
            }
            b.textContent = old;
            b.disabled = false;
        }));
}

/* ---------- чат, встроенный в страницу ---------- */
let chatCtx = null;
let chatTimer = null;

function stopChat() {
    if (chatTimer) clearInterval(chatTimer);
    chatTimer = null;
    const wasStudent = !!(chatCtx && chatCtx.isStudent);
    chatCtx = null;
    const el = $("#inline-chat");
    if (el) el.remove();
    /* у ученика возвращаем плашку с последним сообщением на место */
    if (wasStudent) renderLastTeacherMsg();
}

async function renderChatBody() {
    const body = $("#chat-body");
    if (!body || !chatCtx) return;
    let rows = [];
    if (chatCtx.isStudent) {
        const { data } = await sb.rpc("chat_get", { p_login: studentCreds.login, p_password: studentCreds.password });
        rows = data || [];
        studentMsgs = rows;
    } else {
        const { data } = await sb.from("messages").select("*")
            .eq("student_id", chatCtx.studentId).eq("deleted", false)
            .order("created_at", { ascending: true });
        rows = data || [];
    }
    /* ученику: свои сообщения можно удалить, пока учитель не ответил */
    const canDel = rows.map((m) => {
        if (chatCtx.isStudent && m.sender === "student") {
            return !rows.some((r) => r.sender === "teacher" && new Date(r.created_at) > new Date(m.created_at));
        }
        return !chatCtx.isStudent; /* учитель может удалять любые */
    });
    body.innerHTML = rows.length ? rows.map((m, i) => `
        <div class="bubble ${m.sender === "teacher" ? "them" : "me"}">
            <div class="bubble-text">${esc(m.text)}</div>
            <div class="bubble-meta">${fmtTime(m.created_at)}
                ${canDel[i] ? `<button class="bubble-del" data-mid="${m.id}" title="Удалить">🗑</button>` : ""}
            </div>
        </div>`).join("")
        : `<div class="empty-note" style="padding:30px 0;">Сообщений пока нет.<br>Напишите первым!</div>`;
    body.scrollTop = body.scrollHeight;

    body.querySelectorAll(".bubble-del").forEach((b) =>
        b.addEventListener("click", async (e) => {
            e.stopPropagation();
            const mid = b.dataset.mid;
            if (chatCtx.isStudent) {
                const { data } = await sb.rpc("chat_delete", { p_login: studentCreds.login, p_password: studentCreds.password, p_id: mid });
                if (data && data.error) return toast(data.error, true);
            } else {
                const { error } = await sb.from("messages").update({ deleted: true }).eq("id", mid);
                if (error) return toast("Ошибка: " + error.message, true);
            }
            toast("Сообщение удалено");
            renderChatBody();
        }));
}

/* mode: "after" — вставить после кнопки; "replace" — вместо содержимого контейнера */
function buildInlineChat(anchorEl, title, placeholder, mode) {
    if (chatTimer) clearInterval(chatTimer);
    chatTimer = null;
    const old = $("#inline-chat");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "inline-chat";
    div.innerHTML = `
        <div class="inline-chat-window">
            <div class="chat-head">
                <span>💬 ${esc(title)}</span>
                <button class="chat-close" id="chat-close">✖ Свернуть</button>
            </div>
            <div class="chat-body" id="chat-body"></div>
            <div class="chat-foot">
                <textarea id="chat-input" rows="1" maxlength="2000" placeholder="${esc(placeholder)}"></textarea>
                <button class="btn btn-primary" id="chat-send">➤</button>
            </div>
        </div>`;
    if (mode === "replace") {
        anchorEl.innerHTML = "";
        anchorEl.appendChild(div);
    } else {
        anchorEl.after(div);
    }
    $("#chat-close").addEventListener("click", stopChat);

    const send = async () => {
        const input = $("#chat-input");
        const text = (input.value || "").trim();
        if (!text || !chatCtx) return;
        input.value = "";
        if (chatCtx.isStudent) {
            const { data } = await sb.rpc("chat_send", { p_login: studentCreds.login, p_password: studentCreds.password, p_text: text });
            if (data && data.error) return toast(data.error, true);
        } else {
            const { error } = await sb.from("messages").insert({ student_id: chatCtx.studentId, sender: "teacher", text });
            if (error) return toast("Ошибка: " + error.message, true);
        }
        renderChatBody();
    };
    $("#chat-send").addEventListener("click", send);
    const ta = $("#chat-input");
    /* Enter — отправить, Shift+Enter — новая строка */
    ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    /* поле растёт по мере ввода (до ~5 строк) */
    ta.addEventListener("input", () => {
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 130) + "px";
    });
}

/* учитель: кнопка "Чат с учеником" открывает/сворачивает чат прямо под собой */
function toggleTeacherChat(studentId, name) {
    if (chatCtx && !chatCtx.isStudent && chatCtx.studentId === studentId) { stopChat(); return; }
    chatCtx = { studentId, name, isStudent: false };
    buildInlineChat($("#chat-btn-2"), name, "Сообщение ученику...", "after");
    /* помечаем входящие прочитанными */
    sb.from("messages").update({ read_at: new Date().toISOString() })
        .eq("student_id", studentId).eq("sender", "student").is("read_at", null)
        .then(() => refreshUnread());
    renderChatBody();
    chatTimer = setInterval(renderChatBody, 5000);
}

/* ученик: чат открывается ВМЕСТО плашки с последним сообщением учителя */
function openStudentChat() {
    if (chatCtx && chatCtx.isStudent && $("#inline-chat")) { stopChat(); return; }
    chatCtx = { isStudent: true, name: "Учитель" };
    buildInlineChat($("#last-teacher-msg"), "Чат с учителем", "Напишите сообщение...", "replace");
    renderChatBody();
    chatTimer = setInterval(renderChatBody, 5000);
}

function renderLastTeacherMsg() {
    const box = $("#last-teacher-msg");
    if (!box) return;
    const last = [...studentMsgs].reverse().find((m) => m.sender === "teacher");
    if (!last) { box.innerHTML = ""; return; }
    box.innerHTML = `
        <div class="last-msg-box" id="last-msg-open" title="Открыть чат">
            <div class="last-msg-label">👨‍🏫 Последнее сообщение учителя:</div>
            <div class="last-msg-text">${esc(last.text)}</div>
            <div class="last-msg-time">${fmtTime(last.created_at)}</div>
        </div>`;
    $("#last-msg-open").addEventListener("click", openStudentChat);
}

/* ---------- комментарии учителя к работам ---------- */
function commentHtmlT(studentId, dateKey) {
    const c = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    if (!c) return "";
    return `<div class="hw-comment"><b>💬 Комментарий учителя:</b> ${esc(c.text)}
        <span class="hw-comment-actions">
            <button class="btn btn-sm" data-edit-comment="${esc(dateKey)}" title="Изменить">✏️</button>
            <button class="btn btn-sm btn-danger" data-del-comment="${esc(dateKey)}" title="Удалить">🗑</button>
        </span></div>`;
}

function openCommentModal(studentId, dateKey) {
    const existing = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    const ov = document.createElement("div");
    ov.className = "chat-overlay";
    ov.id = "comment-overlay";
    ov.innerHTML = `
        <div class="chat-window">
            <div class="chat-head"><span>💬 Комментарий к работе на ${esc(fmtDate(dateKey))}</span>
                <button class="chat-close" id="comment-close">✖</button></div>
            <div style="padding:16px;">
                <textarea id="comment-text" rows="5" maxlength="1000"
                    style="width:100%;padding:12px;border:1px solid var(--border);border-radius:10px;font-family:inherit;font-size:14px;"
                    placeholder="Текст комментария для ученика...">${existing ? esc(existing.text) : ""}</textarea>
                <button class="btn btn-primary btn-block" id="comment-save" style="margin-top:12px;">💾 Сохранить</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    const close = () => ov.remove();
    $("#comment-close").addEventListener("click", close);
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    $("#comment-save").addEventListener("click", async () => {
        const text = ($("#comment-text").value || "").trim();
        if (!text) return toast("Введите текст комментария", true);
        const wasDelivered = existing && existing.tg_message_id;
        const payload = {
            student_id: studentId, date: dateKey, text,
            tg_state: wasDelivered ? "edit" : "send",
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await sb.from("hw_comments")
            .upsert(payload, { onConflict: "student_id,date" }).select();
        if (error) return toast("Ошибка: " + error.message, true);
        const row = data && data[0];
        const i = state.comments.findIndex((x) => x.student_id === studentId && String(x.date) === dateKey);
        if (i >= 0) state.comments[i] = row; else state.comments.push(row);
        close();
        toast("Комментарий сохранён");
        renderStudentPageT(studentId);
    });
}

async function deleteComment(studentId, dateKey) {
    if (!confirm("Удалить комментарий?")) return;
    const c = state.comments.find((x) => x.student_id === studentId && String(x.date) === dateKey && !x.deleted);
    if (!c) return;
    if (c.tg_message_id) {
        /* бот удалит сообщение в Telegram и сам зачистит строку */
        const { error } = await sb.from("hw_comments").update({ deleted: true, tg_state: "delete" }).eq("id", c.id);
        if (error) return toast("Ошибка: " + error.message, true);
        c.deleted = true;
    } else {
        const { error } = await sb.from("hw_comments").delete().eq("id", c.id);
        if (error) return toast("Ошибка: " + error.message, true);
        state.comments = state.comments.filter((x) => x.id !== c.id);
    }
    toast("Комментарий удалён");
    renderStudentPageT(studentId);
}

/* ---------- вкладка "Сообщения" (учитель) ---------- */
function renderMessagesPage() {
    const list = state.students
        .filter((s) => state.unread[s.id])
        .sort((a, b) => (state.unread[b.id] || 0) - (state.unread[a.id] || 0));

    content.innerHTML = `
        <h2 class="page-title">💬 Сообщения</h2>
        ${list.length ? `
        <p class="count-note">👤 Диалогов с непрочитанными: ${list.length} · всего сообщений: ${Object.values(state.unread).reduce((a, b) => a + b, 0)}</p>
        <div class="students-grid" id="msg-grid"></div>` : `
        <div class="form-card">
            <div class="empty-note">Непрочитанных сообщений нет.<br>Диалоги с новыми сообщениями учеников появятся здесь.</div>
        </div>`}`;

    const grid = $("#msg-grid");
    if (!grid) return;
    grid.innerHTML = list.map((s) => `
        <div class="student-card" data-id="${s.id}">
            <div class="unread-dot" data-uid="${s.id}">${state.unread[s.id]}</div>
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
        </div>`).join("");
    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));
}

/* ---------- задания (учитель) ---------- */
function renderHomeworksPage() {
    content.innerHTML = `
        <h2 class="page-title">📋 Домашние задания</h2>
        <div class="hw-layout">
            <div class="table-card">
                <h3>Список заданий</h3>
                <div id="hw-table"></div>
            </div>
            <div class="form-card">
                <h3>➕ Добавить задание</h3>
                <form id="hw-form">
                    <label>Название задания *</label>
                    <input type="text" id="hw-title" placeholder="Механика, урок 3" required>
                    <label>Номера из учебника</label>
                    <input type="text" id="hw-ref" placeholder="№ 145-149, стр. 67">
                    <label>Дата сдачи</label>
                    <input type="date" id="hw-date" value="${new Date().toISOString().slice(0, 10)}">
                    <button type="submit" class="btn btn-primary btn-block">Добавить</button>
                </form>
            </div>
        </div>`;
    const tableWrap = $("#hw-table");
    if (!state.homeworks.length) {
        tableWrap.innerHTML = `<div class="empty-note">Пока нет заданий.<br>Добавьте первое справа →</div>`;
    } else {
        tableWrap.innerHTML = `
            <table>
                <thead><tr><th>Название</th><th>Номера</th><th>Дата сдачи</th><th></th></tr></thead>
                <tbody>
                    ${state.homeworks.map((h) => `
                        <tr>
                            <td><strong>${esc(h.title)}</strong></td>
                            <td>${esc(h.textbook_reference || "—")}</td>
                            <td>${esc(fmtDate(h.due_date))}</td>
                            <td><button class="btn btn-sm btn-danger" data-del="${h.id}">🗑</button></td>
                        </tr>`).join("")}
                </tbody>
            </table>`;
        tableWrap.querySelectorAll("[data-del]").forEach((b) =>
            b.addEventListener("click", async () => {
                if (!confirm("Удалить задание? Отправленные работы сохранятся.")) return;
                const { error } = await sb.from("homeworks").delete().eq("id", b.dataset.del);
                if (error) return toast("Ошибка удаления", true);
                state.homeworks = state.homeworks.filter((h) => h.id !== b.dataset.del);
                toast("Задание удалено");
                renderHomeworksPage();
            }));
    }
    $("#hw-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = $("#hw-title").value.trim();
        const ref = $("#hw-ref").value.trim();
        const date = $("#hw-date").value || null;
        if (!title) return toast("Введите название задания", true);
        const { data, error } = await sb.from("homeworks")
            .insert({ title, textbook_reference: ref || null, due_date: date }).select();
        if (error) return toast("Ошибка: " + error.message, true);
        state.homeworks.unshift(data[0]);
        toast("Задание добавлено!");
        renderHomeworksPage();
    });
}

/* ---------- статистика (учитель) ---------- */
function renderStatsPage() {
    const classCounts = {};
    state.students.forEach((s) => { classCounts[s.class_number] = (classCounts[s.class_number] || 0) + 1; });
    const statusCounts = {};
    state.submissions.forEach((s) => { statusCounts[s.status] = (statusCounts[s.status] || 0) + 1; });
    const bar = (label, value, max) => `
        <div class="bar-row">
            <div class="bar-label">${esc(label)}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${max ? Math.round((value / max) * 100) : 0}%"></div></div>
            <div class="bar-value">${value}</div>
        </div>`;
    const metrics = [
        ["👨‍🎓 Учеников", state.students.length],
        ["📋 Заданий", state.homeworks.length],
        ["📝 Работ", state.submissions.length],
        ["✅ Оценено", state.submissions.filter((s) => s.grade).length],
    ];
    content.innerHTML = `
        <h2 class="page-title">📊 Статистика</h2>
        <div class="stats-grid">
            ${metrics.map(([l, v]) => `
                <div class="stat-card metric">
                    <div class="metric-value">${v}</div>
                    <div class="metric-label">${l}</div>
                </div>`).join("")}
        </div>
        <div class="two-col">
            <div class="stat-card">
                <h3>Ученики по классам</h3>
                ${Object.keys(classCounts).length
                    ? Object.entries(classCounts).sort().map(([k, v]) => bar(k + " кл.", v, Math.max(...Object.values(classCounts)))).join("")
                    : `<div class="empty-note">Нет данных</div>`}
            </div>
            <div class="stat-card">
                <h3>Статус работ</h3>
                ${Object.keys(statusCounts).length
                    ? Object.entries(statusCounts).map(([k, v]) => bar((STATUS_LABELS[k] || { text: k }).text, v, Math.max(...Object.values(statusCounts)))).join("")
                    : `<div class="empty-note">Нет данных</div>`}
            </div>
        </div>`;
}

/* ============================================================
   СТАРТ
   ============================================================ */
async function initAuth() {
    loadStudentCreds();
    const { data: { session } } = await sb.auth.getSession();
    state.user = session?.user || null;
    showApp();

    sb.auth.onAuthStateChange((_event, session) => {
        state.user = session?.user || null;
        showApp();
    });
}

function showApp() {
    if (state.user) {
        $("#login-screen").classList.add("hidden");
        $("#student-app").classList.add("hidden");
        $("#app").classList.remove("hidden");
        $("#user-email").textContent = state.user.email || "";
        startUnreadTimer();
        loadData();
        return;
    }
    if (studentCreds && studentCreds.login) {
        /* автовход ученика, если данные сохранены */
        sb.rpc("student_login", { p_login: studentCreds.login, p_password: studentCreds.password })
            .then(({ data }) => {
                if (data && data.length) {
                    studentInfo = data[0];
                    showStudentApp();
                } else {
                    studentCreds = null; saveStudentCreds();
                    showLogin();
                }
            });
        return;
    }
    showLogin();
}

function showLogin() {
    $("#app").classList.add("hidden");
    $("#student-app").classList.add("hidden");
    $("#login-screen").classList.remove("hidden");
}

document.querySelectorAll("#main-tabs .tab").forEach((b) =>
    b.addEventListener("click", () => setTab(b.dataset.tab)));

const bannerEl = $("#teacher-banner");
if (bannerEl) bannerEl.addEventListener("click", () => setTab("calendar"));

initAuth();
