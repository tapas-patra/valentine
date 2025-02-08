// Envelope Opening Animation
function openEnvelope() {
    const topFlap = document.querySelector(".top");
    const paper = document.querySelector(".paper");

    topFlap.style.transform = "rotateX(-120deg) scale(1.05)"; // Opens the flap with a slight bounce

    setTimeout(() => {
        paper.style.transform = "translate(-50%, -50%) scale(1)";
        paper.style.opacity = "1";
        revealText(); // Start revealing text with typing effect
    }, 500);
}

// Function to reveal text with typing effect and auto-scroll
function revealText() {
    const lines = [
        "My Dearest,",
        "",
        "From the moment you came into my life, my world became brighter.",
        "Your smile is my sunshine, and your voice is my favorite melody.",
        "I cherish every moment with you, every laughter, every touch,",
        "every heartbeat that echoes your name.",
        "No matter where life takes us, my heart will always find its way back to you.",
        "You are my home, my happiness, my love.",
        "I promise to stand by your side in every storm and every sunshine.",
        "To love you endlessly, today, tomorrow, and forever.",
        "",
        "With all my love,",
        "Yours Forever ❤️"
    ];

    const textContainer = document.querySelector(".letter-text");
    textContainer.innerHTML = ""; // Clear existing text

    // **Scroll to the bottom before starting the writing effect**
    textContainer.scrollTop = textContainer.scrollHeight;

    let index = 0;

    function typeNextLine() {
        if (index < lines.length) {
            const line = document.createElement("p");
            textContainer.appendChild(line);

            let charIndex = 0;
            function typeCharacter() {
                if (charIndex < lines[index].length) {
                    line.innerHTML += lines[index][charIndex];
                    charIndex++;
                    setTimeout(typeCharacter, 50); // Typing speed
                } else {
                    index++;
                    setTimeout(typeNextLine, 500); // Delay before next line starts
                }
                textContainer.scrollTop = textContainer.scrollHeight; // Auto-scroll up
            }
            typeCharacter();
        }
    }

    setTimeout(typeNextLine, 500); // Start typing effect after a short delay
}


// Floating Hearts Animation with varying sizes and opacity
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed
    heart.style.opacity = Math.random() * 0.5 + 0.5; // Varying transparency
    heart.style.transform = `scale(${Math.random() * 0.6 + 0.7})`; // Varying sizes

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 400);
