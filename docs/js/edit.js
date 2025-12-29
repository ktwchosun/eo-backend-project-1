const form = document.querySelector("#float > form")

const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const newPasswordCheck = document.getElementById("new-password-check");

function validatePassword (text) {
    // 8 ~ 16자 제한
    if (text.length < 8 || text.length > 16) return false;

    // 대소문자, 숫자, 특수문자
    return /^[A-Za-z0-9!"#$%&'()*+,\-.]+$/.test(text);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (localStorage.getItem("password") !== password.value) {
        alert("기존 비밀번호가 일치하지 않습니다.");
        return;
    }

    if (!validatePassword(newPassword.value)) {
        alert("비밀번호는 8 ~ 16자 영문 대소문자, 숫자, 특수문자만 가능합니다.\n특수문자는 ! \" # $ % & ' ( ) * + , - . 만 가능합니다.");
        return;
    }

    if (newPassword.value !== newPasswordCheck.value) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
    }

    localStorage.setItem("password", newPassword.value);
    location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("login") === "0") {
        alert("로그인을 먼저 해주세요.");
        location.href = "./login.html";
    }
});