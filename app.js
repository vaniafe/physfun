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
    const [subs, dates] = await Promise.all([
        sb.rpc("get_my_submissions", { p_login: studentCreds.login, p_password: studentCreds.password }),
        sb.rpc("get_class_dates", { p_school: studentInfo.school, p_class: studentInfo.class_number }),
    ]);
    if (subs.error || dates.error) {
        $("#student-content").innerHTML = `<div class="error-msg" style="margin:30px 0">Ошибка загрузки данных.<br>${esc(subs.error?.message || dates.error?.message || "")}</div>`;
        return;
    }
    studentSubmissions = subs.data || [];
    studentClassDates = dates.data || [];
}

let studentClassDates = [];

function renderStudentPage() {
    const c = $("#student-content");
    c.innerHTML = `
        <div class="student-hero">
            ${avatarHtml(studentInfo.avatar_url, true)}
            <div>
                <h1>${esc(studentInfo.first_name)} ${esc(studentInfo.last_name)}</h1>
                <div class="profile-meta">🏫 ${esc(studentInfo.school)} &nbsp;|&nbsp; 📚 ${esc(studentInfo.class_number)} класс</div>
            </div>
        </div>

        <button class="btn-huge" id="student-submit-btn">📸 Отправить домашнее задание</button>

        <h2 class="page-title" style="font-size:19px">📝 Мои домашние задания</h2>
        <div id="student-works"></div>
    `;

    $("#student-submit-btn").addEventListener("click", openSubmitPanel);
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
            <div class="photos-grid">
                ${items.map((i) => `<img src="${esc(i.photo_url)}" alt="Работа" loading="lazy">`).join("")}
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
    const [st, hw, sub, cal] = await Promise.all([
        sb.from("students").select("*").order("last_name"),
        sb.from("homeworks").select("*").order("due_date", { ascending: false }),
        sb.from("submissions").select("*").order("submitted_at", { ascending: false }),
        sb.from("class_calendar").select("*"),
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
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
            ${s.needs_avatar_update ? `<div class="card-photo-flag">📸 Требуется фото</div>` : ""}
        </div>`).join("");
    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));
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
            ${avatarHtml(st.avatar_url, true)}
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
        <h2 class="page-title" style="font-size:19px">📸 Домашние задания</h2>
        <div id="works"></div>`;

    $("#back-btn").addEventListener("click", () => { state.selectedStudent = null; render(); });
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
            </div>
            <div class="photos-grid">
                ${items.map((i) => `<img src="${esc(i.photo_url)}" alt="Работа" loading="lazy">`).join("")}
            </div>
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
            toast("Сохранено!");
            renderStudentPageT(studentId);
        });
        works.appendChild(block);
    });
    works.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => {
            const lb = document.createElement("div");
            lb.className = "lightbox";
            lb.innerHTML = `<img src="${img.src}">`;
            lb.addEventListener("click", () => lb.remove());
            document.body.appendChild(lb);
        }));
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

initAuth();
