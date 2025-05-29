const countdown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const messageSection = document.getElementById("messageSection");
const continueButton = document.getElementById("continueButton");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");
const audio = document.getElementById("bgMusic");
const poemDiv = document.getElementById("poem");

// Countdown target date
const targetDate = new Date("2025-05-29T00:00:00");

// Poem parts as an array of strings
const poemParts = [
  "Farah, in the garden of time, every moment blooms like a secret flower.",
  "Whispers of the ocean and rustling leaves sing the song of your smile.",
  "May this day, painted in the hues of green and blue, carry my wishes to you."
];

let currentPart = 0;
let wordIndex = 0;
let words = [];

// Countdown update function
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdown.style.display = "none";
    startButton.style.display = "inline-block";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

let timer = setInterval(updateCountdown, 1000);

// display words one by one
function displayWords(part) {
  words = part.split(" ");
  poemDiv.textContent = "";
  wordIndex = 0;

  continueButton.style.display = "none";
  surpriseButton.style.display = "none";
  surpriseMessage.style.display = "none";

  function showNextWord() {
    if (wordIndex < words.length) {
      const span = document.createElement("span");
      span.textContent = (wordIndex === 0 ? "" : " ") + words[wordIndex];
      span.style.opacity = 0;
      span.style.transition = "opacity 0.5s ease";
      poemDiv.appendChild(span);

      requestAnimationFrame(() => {
        span.style.opacity = 1;
      });

      wordIndex++;
      setTimeout(showNextWord, 200);
    } else {
      if (currentPart < poemParts.length - 1) {
        continueButton.style.display = "inline-block";
      } else {
        surpriseButton.style.display = "inline-block";
      }
    }
  }

  showNextWord();
}

startButton.addEventListener("click", () => {
  audio.play().catch(err => console.error("Audio error:", err));
  messageSection.style.display = "block";
  startButton.style.display = "none";

  currentPart = 0;
  displayWords(poemParts[currentPart]);
});

continueButton.addEventListener("click", () => {
  currentPart++;
  if (currentPart < poemParts.length) {
    displayWords(poemParts[currentPart]);
  }
  continueButton.style.display = "none";
});

surpriseButton.addEventListener("click", () => {
  surpriseMessage.style.display = "block";
  surpriseMessage.textContent = "🎉 Happy Birthday, Farah! 🎉";
});
