const textarea = document.getElementById("prompt");
const sendBtn = document.querySelector("#content > .input-box > .input > .bottom > .send");

textarea.addEventListener("input", function () {
    textarea.style.height = "48px";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.value.trim()) sendBtn.classList.add("on");
    else sendBtn.classList.remove("on");
});

textarea.addEventListener("keypress", function (e) {
    if (e.shiftKey && e.key === "Enter") {
        console.log("Shift + Enter");
        
    } else if (e.key === "Enter") {
        e.preventDefault();
        send(textarea.value.trim());
    }
});