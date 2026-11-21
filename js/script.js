
// ==========================================
// 1. ПОЛУЧАЕМ ЭЛЕМЕНТЫ
// ==========================================

const cards = document.querySelectorAll(".story-card");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const startButton = document.getElementById("startButton");

const currentPage = document.getElementById("currentPage");
const progressFill = document.getElementById("progressFill");

const giftButton = document.getElementById("giftButton");
const giftResult = document.getElementById("giftResult");


// ==========================================
// 2. ОСНОВНЫЕ ПЕРЕМЕННЫЕ
// ==========================================

let currentIndex = 0;

const totalPages = cards.length;

let isAnimating = false;


// ==========================================
// 3. ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
// ==========================================

function updateInterface() {

    // Номер текущего экрана
    currentPage.textContent = String(currentIndex + 1).padStart(2, "0");

    // Прогресс
    const progress = ((currentIndex + 1) / totalPages) * 100;

    progressFill.style.width = `${progress}%`;

    // Кнопка назад
    prevButton.disabled = currentIndex === 0;

    // Кнопка далее
    nextButton.disabled = currentIndex === totalPages - 1;

    // Текст последней кнопки
    if (currentIndex === totalPages - 1) {
        nextButton.textContent = "Финал ♡";
    } else {
        nextButton.textContent = "Далее →";
    }

}


// ==========================================
// 4. ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// ==========================================

function showPage(index) {

    if (isAnimating) return;

    if (index < 0 || index >= totalPages) return;

    if (index === currentIndex) return;

    isAnimating = true;

    const previousCard = cards[currentIndex];
    const nextCard = cards[index];

    previousCard.classList.remove("active");
    previousCard.classList.add("exit-left");

    nextCard.classList.remove("exit-left");
    nextCard.classList.add("active");

    currentIndex = index;
        // Управление воспроизведением видео
    const ourVideo = document.querySelector(".our-video");

    if (ourVideo) {
        if (index === 4) {
            ourVideo.muted = true;

            ourVideo.play().catch(error => {
                console.log("Автовоспроизведение недоступно:", error);
            });
        } else {
            ourVideo.pause();
            ourVideo.currentTime = 0;
        }
    }

    updateInterface();

    setTimeout(() => {

        previousCard.classList.remove("exit-left");

        isAnimating = false;

    }, 450);

}


// ==========================================
// 5. КНОПКИ НАВИГАЦИИ
// ==========================================

nextButton.addEventListener("click", () => {

    showPage(currentIndex + 1);

});


prevButton.addEventListener("click", () => {

    showPage(currentIndex - 1);

});


// ==========================================
// 6. КНОПКА НАЧАЛА
// ==========================================

startButton.addEventListener("click", () => {

    showPage(1);

});


// ==========================================
// 7. СВАЙПЫ НА СМАРТФОНАХ
// ==========================================

let touchStartX = 0;
let touchEndX = 0;

const storyContainer = document.querySelector(".story-container");

storyContainer.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });


storyContainer.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });


function handleSwipe() {

    const swipeDistance = touchEndX - touchStartX;

    // Минимальная длина свайпа
    if (Math.abs(swipeDistance) < 60) return;

    if (swipeDistance < 0) {

        // Свайп влево — вперёд
        showPage(currentIndex + 1);

    } else {

        // Свайп вправо — назад
        showPage(currentIndex - 1);

    }

}


// ==========================================
// 8. ОТКРЫТИЕ ПОДАРКА
// ==========================================

giftButton.addEventListener("click", () => {

    giftResult.classList.add("show");

    giftButton.style.display = "none";

});


// ==========================================
// 9. ЗАПУСК
// ==========================================

updateInterface();

console.log("Наша история успешно загружена ❤️");




/* =========================================
   ОТКРЫТИЕ ПИСЬМА ДЛЯ КРИСТЮШИ
========================================= */

const openLetterButton = document.getElementById("openLetterButton");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const letterPaper = document.getElementById("letterPaper");

if (openLetterButton && envelopeWrapper && letterPaper) {
    openLetterButton.addEventListener("click", function () {
        envelopeWrapper.classList.add("opened");

        openLetterButton.classList.add("letter-opened");

        setTimeout(function () {
            letterPaper.hidden = false;
        }, 650);
    });
}



/* =========================================
   АНИМАЦИЯ СЕРДЕЧЕК ВОКРУГ ПИСЬМА
========================================= */

if (openLetterButton && letterPaper) {
    openLetterButton.addEventListener("click", function () {
        setTimeout(function () {
            for (let i = 0; i < 16; i++) {
                const heart = document.createElement("span");

                heart.className = "letter-burst-heart";
                heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

                const angle = (Math.PI * 2 * i) / 16;
                const distance = 65 + Math.random() * 35;

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                heart.style.left = "50%";
                heart.style.top = "50%";
                heart.style.setProperty("--heart-x", `${x}px`);
                heart.style.setProperty("--heart-y", `${y}px`);

                letterPaper.appendChild(heart);

                setTimeout(() => heart.remove(), 1900);
            }
        }, 700);
    });
}

