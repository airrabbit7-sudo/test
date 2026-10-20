const countdown = document.getElementById("countdown");
const tickSound = new Audio("sounds/tick.mp3");
const bumSound = new Audio("sounds/bum.mp3");
const hornSound = new Audio("sounds/horn.mp3");
const cardSound = new Audio("sounds/card.mp3");
const hangSound = new Audio("sounds/hang.mp3");
const fireSound = new Audio("sounds/fire.mp3");
const giftSound = new Audio("sounds/gift-open.mp3");
giftSound.volume = 0.8;
const surpriseStarted = localStorage.getItem("surpriseStarted");
let difference = 0;
let heartTimer;
tickSound.loop = true;
if(!surpriseStarted){
tickSound.play();
}
const targetDate = new Date("2026-10-20T19:13:00");
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
    setTimeout(() => {
    secondProgram();
    }, 3500);
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
    }, 3500);
 }
}
function secondProgram() {
    const birthdayText = document.getElementById("birthday-text");
    const cake = document.getElementById("cake");
    const blowText = document.getElementById("blow-text");

    birthdayText.classList.add("fade-out");
    cake.classList.add("show");

    setTimeout(() => {
        blowText.classList.add("show");
        detectBlow();
    }, 3000);
}
async function detectBlow() {

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.3;

        microphone.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        let loudFrames = 0;

        function checkBlow() {

            analyser.getByteFrequencyData(data);

            let total = 0;

            for (let i = 0; i < data.length; i++) {
                total += data[i];
            }

            const average = total / data.length;

            // NAGYON hangos hang szükséges
            if (average > 80) {
                loudFrames++;
            } else {
                loudFrames = 0;
            }

            // Legalább több egymást követő mérés legyen hangos
            if (loudFrames >= 10) {

                const cake = document.getElementById("cake");
                cake.src = "images/cake2.png";
                hangSound.currentTime = 0;
                hangSound.volume = 1.0;
                hangSound.play();

                stream.getTracks().forEach(track => track.stop());
                audioContext.close();
                setTimeout(() => {
                    thirdProgram();
                }, 1000);
                return;
            }

            requestAnimationFrame(checkBlow);
        }

        checkBlow();

    } catch (error) {
        console.error("Mikrofon hiba:", error);
    }
}
function thirdProgram() {

    detectBlowAgain();

}
async function detectBlowAgain() {

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.3;

        microphone.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        let loudFrames = 0;

        function checkVolume() {

            analyser.getByteFrequencyData(data);

            let total = 0;

            for (let i = 0; i < data.length; i++) {
                total += data[i];
            }

            const average = total / data.length;

            if (average > 80) {
                loudFrames++;
            } else {
                loudFrames = 0;
            }

            if (loudFrames >= 10) {

                const cake = document.getElementById("cake");

                cake.src = "images/cake3.png";
                fireSound.currentTime = 0;
                fireSound.volume = 1.0;
                fireSound.play();
                fireworks();

                stream.getTracks().forEach(track => track.stop());
                audioContext.close();

                return;
            }

            requestAnimationFrame(checkVolume);
        }

        checkVolume();

    } catch (error) {
        console.error("Mikrofon hiba:", error);
    }
}
function fireworks() {

    let running = true;

    function launchFirework() {

        if (!running) return;

        const positions = [
            { x: 10, y: 18 },
            { x: 90, y: 18 },
            { x: 15, y: 40 },
            { x: 85, y: 40 },
            { x: 8, y: 65 },
            { x: 92, y: 65 },
            { x: 25, y: 20 },
            { x: 75, y: 20 },
            { x: 20, y: 60 },
            { x: 80, y: 60 }
        ];

        const position =
            positions[Math.floor(Math.random() * positions.length)];

        createFirework(position.x, position.y);

        // következő tűzijáték 700 ms múlva
        setTimeout(launchFirework, 700);
    }

    // 15 másodperc után leáll
    setTimeout(() => {
        running = false;
    }, 33000);

    setTimeout(() => {
        showGifts();
    }, 33000);


    // első kettő egyszerre indul
    launchFirework();

    setTimeout(() => {
        if (running) {
            launchFirework();
        }
    }, 350);
}


function createFirework(x, y) {

    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("div");

        particle.classList.add("firework-particle");

        particle.textContent = "⭐";

        particle.style.left = x + "vw";
        particle.style.top = y + "vh";

        const angle =
            (Math.PI * 2 / particleCount) * i;

        const distance =
            80 + Math.random() * 50;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

function showGifts() {
    document.getElementById("gifts-container")
        .classList.add("show");
}




function openGift(number) {
    const popup = document.getElementById("gift-popup");
    const content = popup.querySelector(".gift-popup-content");
    const qrCode = document.getElementById("qr-code");
    const title = document.getElementById("gift-title");
    const description = document.getElementById("gift-description");
    const giftLink = document.getElementById("gift-link");

    // Régi tartalom és animációk törlése
    qrCode.innerHTML = "";
    qrCode.style.opacity = "1";
    qrCode.style.display = "flex";

    giftLink.classList.remove("show");
    giftLink.style.display = "none";
    giftLink.href = "#";

    // Ajándékok beállításai
    const gifts = {
        1: {
            title: "Az első ajándékom, fogadd sok szeretettel..💗",
            description: "Szkenneld be! 💕",
            type: "qr",
            url: "https://airrabbit7-sudo.github.io/getmeBBY/",
            button: "Megnyitom az ajándékomat 💗"
        },

        2: {
            title: "A második ajándékommm 🎀",
            description: "Készen állsz a kövi meglepire? 💖",
            type: "link",
            url: "https://airrabbit7-sudo.github.io/nomatterwhat/",
            button: "Mehet a második meglepi 💕"
        },

        3: {
            title: "A harmadik ajándékom neked ❤️",
            description: "Remélem nagyon fogsz neki örülni!.",
            type: "link",
            url: "https://airrabbit7-sudo.github.io/titkosmeghivo/",
            button: "Meheeet 💝"
        }
    };

    const gift = gifts[number];

    if (!gift) return;

    title.textContent = gift.title;
    description.textContent = gift.description;

    if (gift.type === "qr") {
        const qrImage = document.createElement("img");

        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="
            + encodeURIComponent(gift.url);

        qrImage.alt = "QR-kód";

        qrCode.appendChild(qrImage);
    } else {
        qrCode.style.display = "none";

        giftLink.href = gift.url;
        giftLink.textContent = gift.button;
    }

    // Ajándéknyitó hang
    giftSound.pause();
    giftSound.currentTime = 0;

    giftSound.play().catch(error => {
        console.log("A hang nem indult el:", error);
    });

    // Popup megjelenítése és animációja
    popup.classList.add("show");
    content.classList.remove("opening");

    void content.offsetWidth;

    content.classList.add("opening");

    // Tartalom késleltetett megjelenítése
    if (gift.type === "qr") {
        qrCode.style.opacity = "0";
        qrCode.style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            qrCode.style.opacity = "1";
        }, 1500);
    } else {
        setTimeout(() => {
            giftLink.style.display = "block";

            // Az animáció újraindítása
            void giftLink.offsetWidth;

            giftLink.classList.add("show");
        }, 1500);
    }
}

function closeGift() {
    document.getElementById("gift-popup").classList.remove("show");
}


function closeGift() {
    document.getElementById("gift-popup").classList.remove("show");
}


