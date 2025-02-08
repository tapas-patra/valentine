document.addEventListener("DOMContentLoaded", function () {
    const petalContainer = document.getElementById("petal-container");
    const message = document.getElementById("romantic-message");

    let petalCount = 100; // Increased number of petals
    let petalsPlaced = 0;

    // Create Falling Petals
    for (let i = 0; i < petalCount; i++) {
        let petal = document.createElement("div");
        petal.classList.add("petal");

        let startX = Math.random() * window.innerWidth;
        let delay = Math.random() * 3;
        let duration = Math.random() * 6 + 4;

        petal.style.left = `${startX}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `-${delay}s`;

        petalContainer.appendChild(petal);

        // After petals fall, they should cover the screen
        setTimeout(() => {
            petal.classList.add("cover");
            petalsPlaced++;

            // If all petals have covered the page, trigger drop effect
            if (petalsPlaced >= petalCount) {
                setTimeout(dropPetals, 2000);
            }
        }, duration * 1000);
    }

    // Drop all petals and reveal the message
    function dropPetals() {
        let petals = document.querySelectorAll(".petal");

        petals.forEach((petal, index) => {
            setTimeout(() => {
                petal.classList.add("drop");

                // Remove petals after animation
                setTimeout(() => {
                    petal.remove();
                }, 2000);
            }, index * 5);
        });

        // Show Romantic Message
        setTimeout(() => {
            message.style.opacity = "1";
        }, 2500);
    }
});
