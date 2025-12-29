const form = document.querySelector("#float > form");

const email = document.getElementById("email");
const password = document.getElementById("password");

const keepCheck = document.getElementById("keep");
const keepLabel = document.querySelector("#float > form > .keep > label");
const keepBtn = document.querySelector("#float > form > .keep > .icon");

function toggleKeepBtn() {
    keepBtn.checked = !keepBtn.checked;
    renderKeepBtn();
}

function renderKeepBtn() {
    if (keepBtn.checked) {
        keepBtn.innerHTML = `
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
            fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="24" cy="24" r="19" />
            <path d="M16 24.5l6 6 10-13" />`;
    } else {
        keepBtn.innerHTML = `
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
            fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="24" cy="24" r="19" />
        </svg>`;
    }
}

keepLabel.addEventListener("click", toggleKeepBtn);
keepBtn.addEventListener("click", toggleKeepBtn);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateEmail(email.value)) {
        alert("로그인 정보가 없습니다.");
        return;
    }

    if (!validatePassword(password.value)) {
        alert("로그인 정보가 없습니다.");
        return;
    }

    localStorage.setItem("login", "1");
    localStorage.setItem("keep", keepBtn.cheacked ? "1" : "0");

    location.href = "../index.html";
});

function validateEmail (text) { return text == localStorage.getItem("email"); }
function validatePassword (text) { return text == localStorage.getItem("password"); }


// popup
const popup = document.getElementById("popup");

function showPopup (html) {
    popup.querySelector(".label").innerHTML = html;

    popup.classList.add("show");
    setTimeout(function () {
        popup.classList.remove("show");
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    renderKeepBtn();
});