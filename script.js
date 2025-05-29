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
  "There are voices we hear,and voices we remember.",
  "Yours—like wind over water—lingers even when silence falls",
  "I don’t know the paths you’ve walked, nor the dreams you’ve whispered to the trees.",
  "but I believe they carry the softness of someone who feels the world deeply.",
  "Farah, today, the sun rose just a little kinder.",
  "Maybe it knew this day once brought you into the world.",
  "You’ve spoken into the universe with words wrapped in warmth, and somehow, they reached me.",
  "Not as noise. Not even as echo. But as meaning.",
  "You, with a voice that could convince even the stars to hum.",
  "With eyes that seem to notice the way petals lean into the wind.",
  "There’s magic in people like you. Not the kind that shouts. The quiet kind.",
  "The kind that grows in hidden gardens and touches lives without asking anything in return.",
  "If birthdays are markers, then today marks more than time. It marks presence.",
  "The presence of someone who listens to the rhythm of life and chooses to add her own harmony.",
  "You may not always see what you spark, how your presence might nudge a soul back into writing",
  "how a laugh or a thought shared becomes someone’s turning point. But I see it. I felt it.",
  "You inspired me. And I wonder how many more you’ve unknowingly moved.",
  "They say people like you are poems written by the universe and left behind as reminders—of softness, strength, and beginnings.",
  "So let this be mine to you: A page offered on your day, filled with the echo of gratitude and something that could be hope.",
  "So here’s to you, Farah—on this quiet, extraordinary day. You are not just celebrated. You are remembered, and more than that—you are heard."
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
