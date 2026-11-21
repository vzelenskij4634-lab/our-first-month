
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



/* =========================================
   ОТКРЫТИЕ ПРИЧИН ЛЮБВИ
========================================= */

const reasonCards = document.querySelectorAll(".reason-card");

reasonCards.forEach(function (card) {
    card.addEventListener("click", function () {
        card.classList.toggle("opened");

        const heart = card.querySelector(".reason-heart");

        if (card.classList.contains("opened")) {
            heart.textContent = "♥";
        } else {
            heart.textContent = "♡";
        }
    });
});

// ======================================
// СЧЁТЧИК НАШИХ ДНЕЙ ВМЕСТЕ ❤️
// ======================================

// Начало отношений: 24 октября 2026, 17:50 по Москве
const relationshipStart = new Date("2026-10-24T17:50:00+03:00").getTime();

function updateRelationshipCounter() {

    const now = Date.now();

    let difference = now - relationshipStart;

    // Если дата начала ещё не наступила
    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("daysTogether").textContent = days;
    document.getElementById("hoursTogether").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutesTogether").textContent = String(minutes).padStart(2, "0");
    document.getElementById("secondsTogether").textContent = String(seconds).padStart(2, "0");
}

// Сразу обновляем счётчик
updateRelationshipCounter();

// Обновляем каждую секунду
setInterval(updateRelationshipCounter, 1000);


// ======================================
// ИНТЕРАКТИВНЫЕ ПРИЗНАНИЯ ДЛЯ КРИСТЮШИ ❤️
// ======================================

const loveCards = document.querySelectorAll(".love-card");
const loveFinalMessage = document.getElementById("loveFinalMessage");

loveCards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Если карточка уже открыта — ничего не делаем
        if (card.classList.contains("opened")) return;

        // Открываем сердечко
        card.classList.add("opened");

        // Меняем пустое сердечко на заполненное
        const heart = card.querySelector(".love-card-heart");
        heart.textContent = "♥";

        // Проверяем, открыты ли все три признания
        const openedCards = document.querySelectorAll(".love-card.opened");

        if (openedCards.length === loveCards.length) {

            setTimeout(function () {
                loveFinalMessage.classList.add("show");
            }, 500);

        }

    });

});

// ======================================
// ФОНОВАЯ МУЗЫКА НАШЕЙ ИСТОРИИ 🎵
// ======================================

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = musicButton.querySelector(".music-label");
const musicIcon = musicButton.querySelector(".music-icon");

musicButton.addEventListener("click", async function () {

    if (backgroundMusic.paused) {

        try {
            await backgroundMusic.play();

            musicButton.classList.add("playing");
            musicLabel.textContent = "Музыка играет ♡";
            musicIcon.textContent = "♫";

        } catch (error) {
            console.log("Не удалось запустить музыку:", error);
            musicLabel.textContent = "Попробуй ещё раз ♡";
        }

    } else {

        backgroundMusic.pause();

        musicButton.classList.remove("playing");
        musicLabel.textContent = "Включить музыку ♡";
        musicIcon.textContent = "♫";

    }

});