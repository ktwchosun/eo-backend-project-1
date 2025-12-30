const form = document.querySelector("#float > form");

const email = document.getElementById("email");
const codeIn = document.getElementById("code");
const codeBtn = document.getElementById("code-btn");

let code;

function validateEmail (text) { return text === localStorage.getItem("email"); }
function validateCode (text) { return text === code; }

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateEmail(email.value)) {
        alert("해당 이메일로 등록된 계정이 없습니다.");
        return;
    }

    if (!validateCode(codeIn.value)) {
        alert("발급받으신 코드를 올바르게 입력해주세요.");
        return;
    }

    alert(`이메일: ${localStorage.getItem("email")}\n비밀번호: ${localStorage.getItem("password")}`);
    location.href = "./login.html";
});

codeBtn.addEventListener("click", function () {
    if (!validateEmail(email.value)) {
        alert("해당 이메일로 등록된 계정이 없습니다.");
        return;
    }

    code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

    alert(code);
});