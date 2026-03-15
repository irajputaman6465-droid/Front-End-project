const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showSlide(index){
    const width = slideImages[0].clientWidth;
    slides.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    showSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
    showSlide(currentIndex);
});

/* Auto slide every 4 seconds */
setInterval(() => {
    currentIndex = (currentIndex + 1) % slideImages.length;
    showSlide(currentIndex);
}, 4000);

/* DARK MODE TOGGLE */
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});