const form = document.querySelector("#content > form");

const textarea = document.getElementById("prompt");
const sendBtn = document.querySelector("#content > .input-box > .input > .bottom > .send");

textarea.addEventListener("input", function () {
    textarea.style.height = "48px";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.value.trim()) sendBtn.classList.add("on");
    else sendBtn.classList.remove("on");
});

textarea.addEventListener("keypress", function (e) {
    if (!e.shiftKey &&  e.key === "Enter") {
        e.preventDefault();

        if (localStorage.getItem("login") === "0") {
            alert("서비스를 이용하시려면 로그인을 해주세요.");
            return;
        }

        form.requestSubmit();
    }
});

form.addEventListener("submit", function () {
    if (localStorage.getItem("login") === "0") {
        alert("서비스를 이용하시려면 로그인을 해주세요.");
        return;
    }
    
    const text = textarea.value.trim();

    if (text) {
        const random = crypto.randomUUID();

        const uuid = document.createElement("input");
        uuid.type = "hidden";
        uuid.name = "id";
        uuid.value = random;
        form.appendChild(uuid);

        chatList.push({ id: random, name: text.slice(0, 15), bookmark: false, chat: [] });
        localStorage.setItem("chatList", JSON.stringify(chatList));
    }
});

document.addEventListener("keydown", function () {
    textarea.focus();
});

document.addEventListener("DOMContentLoaded", function () {
    // 로컬스토리지에서 대화 목록 동기화
    if (JSON.parse(localStorage.getItem("chatList")))
        chatList = JSON.parse(localStorage.getItem("chatList"));

    renderList();
});