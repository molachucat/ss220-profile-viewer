// Ripple эффект
document.querySelectorAll(".button").forEach(button=>{
    button.addEventListener("click", function(e){
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const rect = button.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";
        button.appendChild(ripple);
        setTimeout(()=> ripple.remove(),600);
    });
});

// Автосохранение темы
const toggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    toggle.checked = true;
}

toggle.addEventListener("change", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
});

// Параллакс эффект
document.addEventListener("mousemove", (e)=>{
    const x = (window.innerWidth/2 - e.pageX)/40;
    const y = (window.innerHeight/2 - e.pageY)/40;
    document.querySelectorAll(".card").forEach(card=>{
        card.style.transform = `translateY(0) rotateY(${x}deg) rotateX(${y}deg)`;
    });
});
