const countdown = document.getElementById("countdown");
const tickSound = new Audio("tick.mp3");
const bumSound = new Audio("bum.mp3");
const hornSound = new Audio("horn.mp3");
const cardSound = new Audio("card.mp3");
const surpriseStarted = localStorage.getItem("surpriseStarted");
let difference = 0;
let heartTimer;
tickSound.loop = true;
if(!surpriseStarted){
tickSound.play();
}
const targetDate = new Date("2026-09-26T18:31:00");
const countdownTimer = setInterval(() => {
    const now = new Date();
    difference = targetDate - now;
    if (difference <= 0) {
        if(surpriseStarted){
            countdown.classList.add("finished");
            clearInterval(countdownTimer);
            firstProgram();
            return;
        }
        countdown.innerHTML = "00 : 00 : 00 : 00";
        localStorage.setItem("surpriseStarted", "true");
        tickSound.pause();
        tickSound.currentTime = 0;
         clearInterval(heartTimer);
         countdown.classList.add("finished");
         clearInterval(countdownTimer);
         firstProgram();
        return;
    }
    const days = Math.floor(difference / (1000*60*60*24));
    const hours = Math.floor(difference/ (1000*60*60) % 24);
    const minutes = Math.floor(difference/ (1000*60) % 60);
    const seconds = Math.floor(difference/ (1000) % 60);
    countdown.innerHTML = `${String(days).padStart(2, "0")} : ${String(hours).padStart(2,"0")} : ${String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`;
}, 1000);
   if(!surpriseStarted){
     heartTimer = setInterval(() => {

    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = "💗";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 4) + "s";

    document.body.appendChild(heart);
}, 50);}

function firstProgram(){
    bumSound.currentTime = 0;
    bumSound.volume = 1.0;
    bumSound.play();
    countdown.classList.add("shrink");
    setTimeout(()=>{
        hornSound.currentTime = 0;
        hornSound.volume = 1.0;
        hornSound.play();
        document.getElementById("birthday-text").classList.add("show");
        celebration();
    },10000)
}
function celebration() {
    cardSound.currentTime = 0;
    cardSound.volume = 1.0;
    cardSound.play();
    const emojis = [
        "🎁", "🎀", "💝", "💖", "💗",
        "✨", "⭐", "🎈", "🥳", "🎉"
    ];

    for (let i = 0; i < 50; i++) {

        createEmoji("left");
        createEmoji("right");
    }

    function createEmoji(side) {

    const emoji = document.createElement("div");

    emoji.classList.add("celebration-emoji");

    emoji.innerHTML =
        emojis[Math.floor(Math.random() * emojis.length)];

    if (side === "left") {

    emoji.style.left = "0px";

    emoji.style.setProperty(
        "--x",
        (30 + Math.random() * 70) + "vw"
    );

} else {

    emoji.style.right = "0px";

    emoji.style.setProperty(
        "--x",
        -(30 + Math.random() * 70) + "vw"
    );
}

    emoji.style.setProperty(
        "--y",
        -(40 + Math.random() * 55) + "vh"
    );

    emoji.style.setProperty(
        "--rotate",
        (Math.random() * 1440 - 720) + "deg"
    );

    emoji.style.fontSize =
        (22 + Math.random() * 28) + "px";

    document.body.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
        secondProgram();
    }, 3500);
 }
}
function secondProgram(){
     document.getElementById("cake").classList.add("show");
}