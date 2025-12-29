const invalidText = {
    email: "올바른 이메일 주소를 입력해주세요.",
    password: "비밀번호는 8 ~ 16자 영문 대소문자, 숫자, 특수문자만 가능합니다.\n특수문자는 ! \" # $ % & ' ( ) * + , - . 만 가능합니다.",
    passwordCheck: "비밀번호가 일치하지 않습니다.",
    code: "발급받으신 코드를 올바르게 입력해주세요."
};

const form = document.querySelector("#float > form");

const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("password-check");
const code = document.getElementById("code");
const codeBtn = document.getElementById("code-btn");

let CODE;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateEmail (email.value)) {
        alert(invalidText.email);
        return;
    }

    if (!validatePassword(password.value)) {
        alert(invalidText.password);
        return;
    }

    if (!validatePasswordCheck(passwordCheck.value)) {
        alert(invalidText.passwordCheck);
        return;
    }

    if (!validateCode(code.value)) {
        alert(invalidText.code);
        return;
    }

    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    location.href = "./login.html";
});

function validateEmail (text) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text); }

function validatePassword (text) {
    // 8 ~ 16자 제한
    if (text.length < 8 || text.length > 16) return false;

    // 대소문자, 숫자, 특수문자
    return /^[A-Za-z0-9!"#$%&'()*+,\-.]+$/.test(text);
}

function validatePasswordCheck (text) { return text == password.value; }

function validateCode (text) { return text == CODE; }

codeBtn.addEventListener("click", function () {
    if (!validateEmail (email.value)) {
        alert(invalidText.email);
        return;
    }

    if (!validatePassword(password.value)) {
        alert(invalidText.password);
        return;
    }

    if (!validatePasswordCheck(passwordCheck.value)) {
        alert(invalidText.passwordCheck);
        return;
    }

    CODE = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

    alert(CODE);
});