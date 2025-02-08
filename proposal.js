document.addEventListener("DOMContentLoaded", function () {
    const candleContainer = document.getElementById("candle-container");
    const words = document.querySelectorAll(".word");
    const overlay = document.getElementById("overlay");
    const buttonContainer = document.getElementById("button-container");
    const noButton = document.getElementById("no-button");

    // Make "No" button move randomly when hovered or tapped
    noButton.addEventListener("mouseenter", moveNoButton);
    noButton.addEventListener("touchstart", moveNoButton);

    function moveNoButton() {
        const buttonContainer = document.getElementById("button-container");

        let maxX = window.innerWidth - noButton.offsetWidth - 40;
        let maxY = window.innerHeight - noButton.offsetHeight - 40;

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;

        noButton.style.position = "absolute";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    // Make "No" button disappear on click
    noButton.addEventListener("click", function () {
        noButton.style.opacity = "0";
    });

    let litCandles = 0;
    const totalCandles = words.length; // Each candle corresponds to one word

    // Generate candles dynamically
    for (let i = 0; i < totalCandles; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        candle.setAttribute("data-index", i);

        let flame = document.createElement("div");
        flame.classList.add("flame");

        let glow = document.createElement("div");
        glow.classList.add("glow");

        candle.appendChild(glow);
        candle.appendChild(flame);
        candleContainer.appendChild(candle);

        // Click event to "light" the candle
        candle.addEventListener("click", function () {
            if (flame.style.opacity === "1") return; // Prevent multiple clicks

            flame.style.opacity = "1"; // Light the flame
            glow.style.opacity = "1"; // Show glow
            candle.style.opacity = "1"; // Brighten candle
            words[i].style.color = "white"; // Reveal corresponding word

            litCandles++;

            // Remove darkness gradually
            let darknessLevel = 1 - (litCandles / totalCandles);
            overlay.style.background = `rgba(0, 0, 0, ${darknessLevel})`;

            // Show buttons when all candles are lit
            if (litCandles === totalCandles) {
                buttonContainer.style.opacity = "1";
            }
        });
    }
     document.getElementById("yes-button").addEventListener("click", function () {
    window.location.href = "rose.html"; // Redirect to the rose animation page
});


});

//function startFireworks() {
//    for (let i = 0; i < 6; i++) { // Fireworks count
//        setTimeout(() => launchFirework(), i * 700);
//    }
//}
//
//function launchFirework() {
//    let fireworkContainer = document.createElement("div");
//    fireworkContainer.classList.add("firework-container");
//    document.body.appendChild(fireworkContainer);
//
//    let x = Math.random() * 100; // Random X position
//    let y = Math.random() * 30 + 20; // Firework bursts in the top 50% of the screen
//
//    let firework = document.createElement("div");
//    firework.classList.add("firework");
//    fireworkContainer.style.left = `${x}vw`;
//
//    // Shooting animation
//    fireworkContainer.style.top = "100vh";
//    setTimeout(() => {
//        fireworkContainer.style.top = `${y}vh`;
//    }, 500);
//
//    // Firework explosion
//    setTimeout(() => {
//        explodeFirework(fireworkContainer);
//    }, 1000);
//}
//
//function explodeFirework(container) {
//    for (let i = 0; i < 30; i++) { // Increased number of particles
//        let particle = document.createElement("div");
//        particle.classList.add("particle");
//
//        let angle = (i / 30) * (2 * Math.PI); // Spread more evenly
//        let distance = Math.random() * 120 + 100; // Increased explosion radius
//
//        let dx = distance * Math.cos(angle);
//        let dy = distance * Math.sin(angle);
//
//        particle.style.transform = `translate(${dx}px, ${dy}px)`;
//        particle.style.backgroundColor = getRandomColor();
//
//        container.appendChild(particle);
//    }
//
//    setTimeout(() => container.remove(), 2500); // Longer visibility
//}
//
//
//function getRandomColor() {
//    let colors = ["#ff0000", "#ff6600", "#ffcc00", "#33cc33", "#3399ff", "#9933ff"];
//    return colors[Math.floor(Math.random() * colors.length)];
//}
//
//
//// Display Romantic Message
//function showLoveMessage() {
//    let message = document.createElement("div");
//    message.classList.add("love-message");
//    message.innerHTML = "You Just Made My Day! ❤️<br>Happy Propose Day!";
//    document.body.appendChild(message);
//
//    setTimeout(() => message.style.opacity = "1", 500);
//}