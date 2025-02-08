//document.addEventListener("DOMContentLoaded", () => {
//    gsap.utils.toArray(".milestone").forEach((box, i) => {
//        gsap.to(box, {
//            scrollTrigger: {
//                trigger: box,
//                start: "top bottom",
//                end: "top center",
//                scrub: true
//            },
//            opacity: 1,
//            y: 0
//        });
//    });
//
//    // Auto-scroll effect with hold-to-stop
//    let timeline = document.querySelector(".timeline");
//    let scrollPosition = 0;
//    let scrolling = true; // Controls auto-scrolling
//
//    function autoScroll() {
//        if (scrolling) {
//            scrollPosition += 2;
//            if (scrollPosition > timeline.scrollWidth - window.innerWidth) {
//                scrollPosition = 0;
//            }
//            timeline.style.transform = `translateX(-${scrollPosition}px)`;
//        }
//        requestAnimationFrame(autoScroll);
//    }
//    autoScroll();
//
//    // Stop scrolling on hover or touch
//    document.querySelectorAll(".milestone").forEach(milestone => {
//        milestone.addEventListener("mouseenter", () => scrolling = false);
//        milestone.addEventListener("mouseleave", () => scrolling = true);
//
//        milestone.addEventListener("touchstart", () => scrolling = false);
//        milestone.addEventListener("touchend", () => scrolling = true);
//    });
//
//    // Starry background animation
//    const canvas = document.getElementById("stars");
//    const ctx = canvas.getContext("2d");
//
//    function resizeCanvas() {
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;
//    }
//    window.addEventListener("resize", resizeCanvas);
//    resizeCanvas();
//
//    let stars = [];
//    for (let i = 0; i < 100; i++) {
//        stars.push({
//            x: Math.random() * canvas.width,
//            y: Math.random() * canvas.height,
//            radius: Math.random() * 2,
//            speed: Math.random() * 2 + 0.5
//        });
//    }
//
//    function animateStars() {
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        stars.forEach(star => {
//            ctx.beginPath();
//            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//            ctx.fillStyle = "white";
//            ctx.fill();
//            star.y += star.speed;
//            if (star.y > canvas.height) star.y = 0;
//        });
//        requestAnimationFrame(animateStars);
//    }
//    animateStars();
//});


//document.addEventListener("DOMContentLoaded", () => {
//    gsap.utils.toArray(".milestone").forEach((box) => {
//        gsap.to(box, {
//            scrollTrigger: {
//                trigger: box,
//                start: "top bottom",
//                end: "top center",
//                scrub: true
//            },
//            opacity: 1,
//            y: 0
//        });
//    });
//
//    let timeline = document.querySelector(".timeline");
//    let timelineWidth = timeline.scrollWidth;
//    let viewportWidth = window.innerWidth;
//    let scrollSpeed = 1.5; // Adjust speed here
//    let resetDelay = 50; // Delay before switching direction
//    let direction = 1; // 1 for forward, -1 for reverse
//
//    function loopScroll() {
//        gsap.to(timeline, {
//            x: direction === 1 ? `-${timelineWidth - viewportWidth}px` : "0px",
//            duration: (timelineWidth / 100) * scrollSpeed, // Adjust speed dynamically
//            ease: "linear",
//            onComplete: () => {
//                setTimeout(() => {
//                    direction *= -1; // Reverse direction
//                    loopScroll(); // Start movement in opposite direction
//                }, resetDelay);
//            }
//        });
//    }
//
//    loopScroll();
//
//    // Starry Background Animation (Unchanged)
//    const canvas = document.getElementById("stars");
//    const ctx = canvas.getContext("2d");
//
//    function resizeCanvas() {
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;
//    }
//    window.addEventListener("resize", resizeCanvas);
//    resizeCanvas();
//
//    let stars = [];
//    for (let i = 0; i < 100; i++) {
//        stars.push({
//            x: Math.random() * canvas.width,
//            y: Math.random() * canvas.height,
//            radius: Math.random() * 2,
//            speed: Math.random() * 2 + 0.5
//        });
//    }
//
//    function animateStars() {
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        stars.forEach(star => {
//            ctx.beginPath();
//            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//            ctx.fillStyle = "white";
//            ctx.fill();
//            star.y += star.speed;
//            if (star.y > canvas.height) star.y = 0;
//        });
//        requestAnimationFrame(animateStars);
//    }
//    animateStars();
//});


document.addEventListener("DOMContentLoaded", () => {
    gsap.utils.toArray(".milestone").forEach((box) => {
        gsap.to(box, {
            scrollTrigger: {
                trigger: box,
                start: "top bottom",
                end: "top center",
                scrub: true
            },
            opacity: 1,
            y: 0
        });
    });

    let timeline = document.querySelector(".timeline");
    let timelineWrapper = document.querySelector(".timeline-wrapper");
    let timelineWidth = timeline.scrollWidth;
    let viewportWidth = window.innerWidth;
    let scrollSpeed = 1.5; // Adjust speed here
    let resetDelay = 1000; // Pause before reversing
    let direction = 1; // 1 = forward, -1 = reverse
    let autoScrolling = true; // Controls auto-scrolling

    function loopScroll() {
        if (!autoScrolling) return; // Stop auto-scroll if user interacts

        gsap.to(timeline, {
            x: direction === 1 ? `-${timelineWidth - viewportWidth}px` : "0px",
            duration: (timelineWidth / 100) * scrollSpeed, // Adjust speed dynamically
            ease: "linear",
            onComplete: () => {
                setTimeout(() => {
                    if (autoScrolling) {
                        direction *= -1; // Reverse direction
                        loopScroll(); // Continue auto-scrolling
                    }
                }, resetDelay);
            }
        });
    }

    loopScroll();

    // ✅ Allow Manual Scrolling, Pause Auto-Scroll, and Resume Later
    let scrollTimeout;
    function pauseAutoScroll() {
        autoScrolling = false;
        gsap.killTweensOf(timeline); // Stop GSAP animations
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            autoScrolling = true;
            loopScroll(); // Resume auto-scrolling after a short delay
        }, 3000); // Adjust time before resuming auto-scroll
    }

    timelineWrapper.addEventListener("wheel", pauseAutoScroll);
    timelineWrapper.addEventListener("touchstart", pauseAutoScroll);

    // Starry Background Animation (Unchanged)
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 2 + 0.5
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) star.y = 0;
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
});

