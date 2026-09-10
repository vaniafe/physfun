/* ============================================================
   physfun.ru — панель учителя (статический сайт для Vercel)
   Работает с Supabase: ученики, задания, календарь, проверка
   работ, статистика
   Версия 2: календарь классов, удаление учеников, ОГЭ/ЕГЭ
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
    user: null,
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

function calKey(school, cls, dateStr) {
    return `${school}|${cls}|${dateStr}`;
}

/* ---------- загрузка данных ---------- */
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
            Проверьте config.js и что выполнены скрипты supabase_security.sql
            и supabase_update_v2.sql.<br>${esc(err.message)}</div>`;
        return;
    }
    state.students = st.data || [];
    state.homeworks = hw.data || [];
    state.submissions = sub.data || [];
    state.calendar = cal.data || [];
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
    else if (state.tab === "calendar") renderCalendarPage();
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
            ${s.exam_flag && examLabel(s.class_number) ? `<div class="exam-badge">${examLabel(s.class_number)}</div>` : ""}
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
    if (avatarPath) {
        try { await sb.storage.from("avatars").remove([avatarPath]); } catch (e) { }
    }
    const photoPaths = subs
        .map((s) => storagePath(s.photo_url, "homework-photos"))
        .filter(Boolean);
    if (photoPaths.length) {
        try { await sb.storage.from("homework-photos").remove(photoPaths); } catch (e) { }
    }

    const { error } = await sb.from("students").delete().eq("id", student.id);
    if (error) return toast("Ошибка удаления: " + error.message, true);

    state.students = state.students.filter((s) => s.id !== student.id);
    state.submissions = state.submissions.filter((s) => s.student_id !== student.id);
    state.selectedStudent = null;
    toast("Ученик удалён");
    render();
}

function renderStudentPage(studentId) {
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
                <div class="profile-count">Всего работ: ${subs.length}</div>
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
        <div id="works"></div>
    `;

    $("#back-btn").addEventListener("click", () => { state.selectedStudent = null; render(); });

    $("#delete-btn").addEventListener("click", async () => {
        const ok = confirm(
            `Удалить ученика ${st.last_name} ${st.first_name}?\n\n` +
            `Будут удалены: профиль, аватарка и ${subs.length} отправленных работ.\n` +
            `Действие необратимо!`
        );
        if (!ok) return;
        $("#delete-btn").disabled = true;
        $("#delete-btn").textContent = "⏳ Удаление…";
        await deleteStudent(st);
    });

    $("#photo-flag").addEventListener("change", async (e) => {
        const { error } = await sb.from("students")
            .update({ needs_avatar_update: e.target.checked })
            .eq("id", studentId);
        if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
        else {
            st.needs_avatar_update = e.target.checked;
            toast(e.target.checked ? "Требование смены фото установлено" : "Требование снято");
        }
    });

    const examBox = $("#exam-flag");
    if (examBox) {
        examBox.addEventListener("change", async (e) => {
            const { error } = await sb.from("students")
                .update({ exam_flag: e.target.checked })
                .eq("id", studentId);
            if (error) { toast("Ошибка сохранения", true); e.target.checked = !e.target.checked; }
            else {
                st.exam_flag = e.target.checked;
                toast(e.target.checked ? `${exam} отмечено` : `${exam} снято`);
            }
        });
    }

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

    works.querySelectorAll(".photos-grid img").forEach((img) =>
        img.addEventListener("click", () => {
            const lb = document.createElement("div");
            lb.className = "lightbox";
            lb.innerHTML = `<img src="${img.src}">`;
            lb.addEventListener("click", () => lb.remove());
            document.body.appendChild(lb);
        }));
}

/* ===================== КАЛЕНДАРЬ ===================== */
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
        state.calendar
            .filter((r) => r.school === state.calSchool && r.class_number === state.calClass)
            .map((r) => r.date)
    );

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
                ${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((w, i) =>
                    `<div class="cal-weekday ${i >= 5 ? "weekend" : ""}">${w}</div>`).join("")}
                ${cells}
            </div>
            <div class="cal-hint">
                💡 Нажмите на число, чтобы отметить его как день сдачи домашнего задания
                (ещё раз — снять отметку). Отмечено: <strong>${marked.size}</strong>.
                Эти даты ученик выбирает в Telegram-боте при отправке работы.
            </div>
        </div>
    `;

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
                    .insert({ school: state.calSchool, class_number: state.calClass, date: dateStr })
                    .select();
                if (error) return toast("Ошибка: " + error.message, true);
                state.calendar.push(data[0]);
            }
            renderCalendarPage();
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
