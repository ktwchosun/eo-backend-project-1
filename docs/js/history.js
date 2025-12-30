const buttons = document.querySelectorAll("#content > .box > .buttons > button");
const allBtn = document.getElementById("all-btn");
const bookmarkBtn = document.getElementById("bookmark-btn");

const historyList = document.getElementById("list");

if (localStorage.getItem("login") === "0") {
    alert("서비스를 이용하시려면 로그인을 해주세요.");
    location.href = "./members/login.html";
}

buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        buttons.forEach(function (item) { item.classList.remove("focus"); });
        btn.classList.add("focus");
    });
})

allBtn.addEventListener("click", function () { renderHistory("all", chatList); });
bookmarkBtn.addEventListener("click", function () { renderHistory("bookmark", chatList); });

function renderHistory (type, array) {
    historyList.innerHTML = "";

    if (type === "all") {
        for (const item of array) {
            const li = document.createElement("li");

            const a = document.createElement("a");
            a.href = `./chat.html?id=${encodeURIComponent(item.id)}`;
            a.innerText = item.name;

            li.appendChild(a);
            historyList.appendChild(li);
        }
    } else if (type === "bookmark") {
        for (const item of array) {
            if (item.bookmark) {
                const li = document.createElement("li");

                const a = document.createElement("a");
                a.href = `./chat.html?id=${encodeURIComponent(item.id)}`;
                a.innerText = item.name;

                li.appendChild(a);
                historyList.appendChild(li);
            }
        }
    } else { console.error("There's no type like that."); }
}

document.addEventListener("DOMContentLoaded", function () {
    if (JSON.parse(localStorage.getItem("chatList")))
        chatList = JSON.parse(localStorage.getItem("chatList"));

    renderList();
    renderHistory("all", chatList);
});