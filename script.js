document.getElementById("mainBtn").addEventListener("click", () => {
    alert("Кнопка работает 🚀");
});

document.getElementById("themeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("light", e.target.checked);
});
