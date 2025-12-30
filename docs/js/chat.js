// Get 메서드로 받아온 데이터 정리
const data = Object.fromEntries(new URLSearchParams(location.search));
history.replaceState(null, '', `${location.pathname}?id=${encodeURIComponent(data.id)}`);

// 해당 채팅창 내부 데이터 선언
let chatData = {};

// 요소 선언
const header = document.getElementById("header");

const form = document.querySelector("#content > .box > .input-box");

const box = document.querySelector("#content > .box");
const textarea = document.getElementById("prompt");
const sendBtn = document.querySelector("#content > .box > .input-box > .input > .bottom > .send");

const chatBox = document.querySelector("#content > .chat-box");
const chats = document.getElementById("chats");

// 로컬스토리지에서 대화 목록 동기화
if (JSON.parse(localStorage.getItem("chatList")))
    chatList = JSON.parse(localStorage.getItem("chatList"));

renderList();

// 데이터 받아오기
chatData = chatList.find(v => v.id === data.id);

// 없으면 메인 페이지로 입구 컷 / 있으면 랜더링
if (chatData) {
    header.innerText = chatData.name;

    // 초기 랜더링
    for (const item of chatData.chat) {
        const li = document.createElement("li");
        li.innerText = item.content;

        if (item.role === "user") li.classList.add("user");
        else if (item.role === "assistant") li.classList.add("assistant");

        chats.appendChild(li);
    }

    send(data.prompt);
} else location.href = "./index.html";

chats.style.marginBottom = box.scrollHeight + 36 + "px";
chatBox.scrollTop = chatBox.scrollHeight;

textarea.addEventListener("input", function () {
    textarea.style.height = "48px";
    textarea.style.height = textarea.scrollHeight + "px";

    chats.style.marginBottom = box.scrollHeight + 36 + "px";

    if (textarea.value.trim()) sendBtn.classList.add("on");
    else sendBtn.classList.remove("on");
});

textarea.addEventListener("keypress", function (e) {
    if (!e.shiftKey &&  e.key === "Enter") {
        e.preventDefault();
        form.requestSubmit();
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(textarea.value.trim());
});

document.addEventListener("keydown", function () {
    textarea.focus();
});

function send (text) {
    if (!text) return;

    textarea.value = "";

    const user = document.createElement("li");
    user.classList.add("user");
    user.innerText = text;

    chats.appendChild(user);
    chatData.chat.push( { role: "user", content: text });

    const assistant = document.createElement("li");
    assistant.classList.add("assistant");
    assistant.innerText = text;

    chats.appendChild(assistant);
    chatData.chat.push( { role: "assistant", content: text });
    assistant.scrollIntoView({ behavior: "smooth" });

    localStorage.setItem("chatList", JSON.stringify(chatList));
}