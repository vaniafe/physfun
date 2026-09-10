/* ============================================================
   physfun.ru — панель учителя (статический сайт для Vercel)
   Работает с Supabase: ученики, задания, проверка работ, статистика
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

/* --- состояние --- */
const state = {
    user: null,
    students: [],
    homeworks: [],
    submissions: [],
    tab: "students",          // students | homeworks | stats
    school: null,
    classNumber: null,
    selectedStudent: null,
};

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
    t._timer = setTimeout(() => t.classList.add("hidden"), 2600);
}

function avatarHtml(url, large = false) {
    const cls = large ? "avatar-circle avatar-large" : "avatar-circle";
    const fallback = large ? "avatar-fallback avatar-large" : "avatar-fallback";
    return `<img src="${esc(url || "")}" class="${cls}" alt=""
        onerror="this.outerHTML='<div class=&quot;${fallback}&quot;>🧑‍🎓</div>'">`;
}

/* ---------- загрузка данных ---------- */
async function loadData() {
    content.innerHTML = `<div class="loading">Загрузка…</div>`;
    const [st, hw, sub] = await Promise.all([
        sb.from("students").select("*").order("last_name"),
        sb.from("homeworks").select("*").order("due_date", { ascending: false }),
        sb.from("submissions").select("*").order("submitted_at", { ascending: false }),
    ]);
    if (st.error || hw.error || sub.error) {
        content.innerHTML = `<div class="error-msg" style="margin:30px 0">Ошибка загрузки данных.
            Проверьте config.js и что выполнен скрипт supabase_security.sql.<br>
            ${esc(st.error?.message || hw.error?.message || sub.error?.message || "")}</div>`;
        return;
    }
    state.students = st.data || [];
    state.homeworks = hw.data || [];
    state.submissions = sub.data || [];
    render();
}

/* ---------- навигация ---------- */
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

/* ---------- отрисовка ---------- */
function render() {
    if (state.selectedStudent) return renderStudentPage(state.selectedStudent);

    if (state.tab === "students") renderStudentsPage();
    else if (state.tab === "homeworks") renderHomeworksPage();
    else if (state.tab === "stats") renderStatsPage();
}

/* ===================== УЧЕНИКИ ===================== */
function renderStudentsPage() {
    const schools = Object.keys(SCHOOLS_CONFIG);
    if (!state.school || !SCHOOLS_CONFIG[state.school]) state.school = schools[0];
    if (!state.classNumber || !SCHOOLS_CONFIG[state.school].includes(state.classNumber)) {
        state.classNumber = SCHOOLS_CONFIG[state.school][0];
    }

    const classes = SCHOOLS_CONFIG[state.school];
    const list = state.students.filter(
        (s) => s.school === state.school && s.class_number === state.classNumber
    );

    content.innerHTML = `
        <h2 class="page-title">👨‍🎓 Ученики</h2>
        <div class="sub-tabs" id="school-tabs">
            ${schools.map((sc) => `<button class="sub-tab ${sc === state.school ? "active" : ""}" data-school="${esc(sc)}">${esc(sc)}</button>`).join("")}
        </div>
        <div class="sub-tabs" id="class-tabs">
            ${classes.map((c) => `<button class="sub-tab ${c === state.classNumber ? "active" : ""}" data-class="${esc(c)}">${esc(c)} класс</button>`).join("")}
        </div>
        <p class="count-note">👥 Всего: ${list.length} учеников</p>
        <div class="students-grid" id="students-grid"></div>
    `;

    document.querySelectorAll("#school-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.school = b.dataset.school; renderStudentsPage(); }));
    document.querySelectorAll("#class-tabs .sub-tab").forEach((b) =>
        b.addEventListener("click", () => { state.classNumber = b.dataset.class; renderStudentsPage(); }));

    const grid = $("#students-grid");
    if (!list.length) {
        grid.innerHTML = `<div class="empty-note" style="grid-column:1/-1">В этом классе пока нет учеников.<br>Ученики появятся после регистрации в Telegram-боте.</div>`;
        return;
    }

    grid.innerHTML = list.map((s) => `
        <div class="student-card" data-id="${s.id}">
            ${avatarHtml(s.avatar_url)}
            <div class="student-name">${esc(s.last_name)}<br>${esc(s.first_name)}</div>
            <div class="student-class">${esc(s.class_number)} класс</div>
            ${s.needs_avatar_update ? `<div class="card-photo-flag">📸 Требуется фото</div>` : ""}
        </div>
    `).join("");

    grid.querySelectorAll(".student-card").forEach((card) =>
        card.addEventListener("click", () => openStudent(card.dataset.id)));
}

/* ===================== СТРАНИЦА УЧЕНИКА ===================== */
function homeworkById(id) {
    return state.homeworks.find((h) => h.id === id);
}

/* группировка работ по дате сдачи (или дате отправки) */
function groupSubmissions(studentId) {
    const groups = new Map();
    state.submissions.filter((s) => s.student_id === studentId).forEach((sub) => {
        const hw = homeworkById(sub.homework_id);
        const key = hw?.due_date || (sub.submitted_at ? String(sub.submitted_at).slice(0, 10) : null) || "Без даты";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(sub);
    });
    return [...groups.entries()].sort((a, b) => (a[0] === "Без даты" ? -1 : b[0] === "Без даты" ? 1 : b[0].localeCompare(a[0])));
}

function renderStudentPage(studentId) {
    const st = state.students.find((s) => s.id === studentId);
    if (!st) { state.selectedStudent = null; return render(); }

    const subs = state.submissions.filter((s) => s.student_id === studentId);
    const groups = groupSubmissions(studentId);

    content.innerHTML = `
        <div class="back-row"><button class="btn" id="back-btn">← Назад к списку</button></div>

        <div class="profile-header">
            ${avatarHtml(st.avatar_url, true)}
            <div>
                <h1>${esc(st.last_name)} ${esc(st.first_name)}</h1>
                <div class="profile-meta">🏫 ${esc(st.school)} &nbsp;|&nbsp; 📚 ${esc(st.class_number)} класс</div>
                <div class="profile-count">Всего работ: ${subs.length}</div>
            </div>
        </div>

        <label class="flag-row">
            <input type="checkbox" id="photo-flag" ${st.needs_avatar_update ? "checked" : ""}>
            📸 Требовать смену фото профиля
        </label>

        <h2 class="page-title" style="font-size:19px">📸 Домашние задания</h2>
        <div id="works"></div>
    `;

    $("#back-btn").addEventListener("click", () => { state.selectedStudent = null; render(); });

    $("#photo-flag").addEventListener("change", async (e) => {
        const { error } = await sb.from("students")
            .update({ needs_avatar_update: e.target.checked })
            .eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else {
            st.needs_avatar_update = e.target.checked;
            toast(e.target.checked ? "Требование обновления фото установлено" : "Требование снято");
        }
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
            </div>
        `;

        block.querySelector(".btn-save").addEventListener("click", async () => {
            const checked = block.querySelector(".chk-checked").checked;
            const gradeVal = block.querySelector(".sel-grade").value;
            const grade = gradeVal === "" ? null : parseInt(gradeVal, 10);
            const status = checked ? (grade ? "graded" : "checked") : "pending";

            const ids = items.map((i) => i.id);
            const { error } = await sb.from("submissions")
                .update({ status, grade })
                .in("id", ids);

            if (error) return toast("Ошибка сохранения: " + error.message, true);

            items.forEach((i) => { i.status = status; i.grade = grade; });
            toast("Сохранено!");
            renderStudentPage(studentId);
        });

        works.appendChild(block);
    });

    /* клик по фото — на весь экран */
    works.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => {
            const lb = document.createElement("div");
            lb.className = "lightbox";
            lb.innerHTML = `<img src="${img.src}">`;
            lb.addEventListener("click", () => lb.remove());
            document.body.appendChild(lb);
        }));
}

/* ===================== ЗАДАНИЯ ===================== */
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
        </div>
    `;

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
            .insert({ title, textbook_reference: ref || null, due_date: date })
            .select();

        if (error) return toast("Ошибка: " + error.message, true);

        state.homeworks.unshift(data[0]);
        toast("Задание добавлено!");
        renderHomeworksPage();
    });
}

/* ===================== СТАТИСТИКА ===================== */
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
        </div>
    `;
}

/* ===================== АВТОРИЗАЦИЯ ===================== */
async function initAuth() {
    const { data: { session } } = await sb.auth.getSession();
    state.user = session?.user || null;
    showApp();

    sb.auth.onAuthStateChange((_event, session) => {
        state.user = session?.user || null;
        showApp();
    });
}

function showApp() {
    const loggedIn = !!state.user;
    $("#login-screen").classList.toggle("hidden", loggedIn);
    $("#app").classList.toggle("hidden", !loggedIn);
    if (loggedIn) {
        $("#user-email").textContent = state.user.email || "";
        loadData();
    }
}

$("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = $("#login-error");
    err.classList.add("hidden");
    const { error } = await sb.auth.signInWithPassword({
        email: $("#login-email").value.trim(),
        password: $("#login-password").value,
    });
    if (error) {
        err.textContent = "Ошибка входа: " + error.message;
        err.classList.remove("hidden");
    }
});

$("#logout-btn").addEventListener("click", async () => {
    await sb.auth.signOut();
});

document.querySelectorAll("#main-tabs .tab").forEach((b) =>
    b.addEventListener("click", () => setTab(b.dataset.tab)));

/* ---------- старт ---------- */
initAuth();
