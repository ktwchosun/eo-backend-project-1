const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("sidebar-collapse");

collapseBtn.addEventListener("click", function () {
    const isCollapse = document.documentElement.classList.toggle("sidebar-collapse");
    localStorage.setItem("sidebarCollapse", isCollapse ? "1" : "0");
});

const folders = document.querySelectorAll("#sidebar > .folder");

folders.forEach(function (folder) {
    folder.querySelector(".header > button").addEventListener("click", function () {
        folder.querySelector("ul").classList.toggle("hide");
    });
});

let chatList = [];

const bookmarkUl = document.getElementById("bookmark");
const recentUl = document.getElementById("recent");

function renderList () {
    bookmarkUl.innerHTML = "";
    recentUl.innerHTML = "";

    for (const chat of chatList) {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = `./chat.html?id=${encodeURIComponent(chat.id)}`;
        a.classList.add("label");
        a.innerText = chat.name;

        a.addEventListener("mouseover", function () {
            li.classList.add("highlight");
        });

        a.addEventListener("mouseout", function () {
            li.classList.remove("highlight");
        });

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("icon");
        button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
            <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
            <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
        </svg>`;

        button.addEventListener("click", function () {
            console.log("Clicked" + chat.name);
        });

        li.appendChild(a);
        li.appendChild(button);

        if (chat.bookmark) bookmarkUl.appendChild(li);
        else recentUl.appendChild(li);
    }
}

const popupBlocker = document.getElementById("popup-blocker");

const account = document.getElementById("account");
const accountMenu = document.querySelector("#sidebar > .popup-menu-wrapper > .popup-menu");

function activePopup (popup) {
    popup.classList.add("open");
    popupBlocker.classList.add("active");
}

account.addEventListener("click", function () {
    activePopup (accountMenu);
});

popupBlocker.addEventListener("click", function () {
    document.querySelectorAll(".popup-menu").forEach(function (popup) {
        popup.classList.remove("open");
        popupBlocker.classList.remove("active");
    });
});

// DOM Loaded
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("login") === "1") {
        account.querySelector(".label").innerText = localStorage.getItem("email");

        accountMenu.innerHTML = "";

        const editUser = document.createElement("a");
        editUser.href = "./members/edit.html";
        editUser.innerHTML = `<span class="label">비밀번호 재설정</span>`;
        accountMenu.appendChild(editUser);

        accountMenu.appendChild(document.createElement("hr"));

        const light = document.createElement("a");
        light.innerHTML = `<span class="label">라이트 모드</span>`;

        light.addEventListener("click", function (e) {
            e.preventDefault();
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        });

        accountMenu.appendChild(light);

        const dark = document.createElement("a");
        dark.innerHTML = `<span class="label">다크 모드</span>`;

        dark.addEventListener("click", function (e) {
            e.preventDefault();
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        });

        accountMenu.appendChild(dark);

        accountMenu.appendChild(document.createElement("hr"));

        const logout = document.createElement("a");
        logout.href = "./index.html";
        logout.innerHTML = `<span class="label">로그아웃</span>`;

        logout.addEventListener("click", function () {
            localStorage.setItem("login", "0");
            localStorage.removeItem("chatList");
        });

        accountMenu.appendChild(logout);
    };
});