const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = { A: [], R: [], T: [], I: [] };
const numParticlesPerLetter = 30; // Increased dots for better accuracy
let forming = true;
let connectionsVisible = false;

const letterDelays = [0, 1500, 3000, 4500];

const letterCoords = {
    A: [ {x:-120,y:50},{x:-115,y:30},{x:-110,y:10},{x:-105,y:-10},{x:-100,y:-30},{x:-95,y:-40},
         {x:-90,y:-40},{x:-85,y:-30},{x:-80,y:-10},{x:-75,y:10},{x:-70,y:30},{x:-65,y:50},
         {x:-108,y:5},{x:-95,y:5},{x:-85,y:5} ],
    R: [ {x:-10,y:50},{x:-10,y:30},{x:-10,y:10},{x:-10,y:-10},{x:-10,y:-30},{x:-10,y:-40},
         {x:0,y:-40},{x:10,y:-35},{x:15,y:-25},{x:15,y:-15},{x:10,y:-5},{x:0,y:0},
         {x:10,y:10},{x:20,y:20},{x:25,y:30},{x:30,y:50} ],
    T: [ {x:65,y:-40}, {x:70,y:-40},{x:80,y:-40},{x:90,y:-40},{x:100,y:-40}, // Added one more dot to the left
         {x:85,y:50},{x:85,y:40},{x:85,y:30},{x:85,y:20},{x:85,y:10},{x:85,y:0},{x:85,y:-10},
         {x:85,y:-20},{x:85,y:-30} ],
    I: [ {x:130,y:50},{x:130,y:40},{x:130,y:30},{x:130,y:20},{x:130,y:10},{x:130,y:0},
         {x:130,y:-10},{x:130,y:-20},{x:130,y:-30} ]
};


function createParticles() {
    for (let letter in letterCoords) {
        particles[letter] = [];

        for (let i = 0; i < numParticlesPerLetter; i++) {
            let point = letterCoords[letter][i % letterCoords[letter].length];
            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;

            particles[letter].push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: centerX + point.x * 5,
                targetY: centerY + point.y * 5,
                radius: 3,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                visible: false
            });
        }
    }
}

function startFormingName() {
    forming = true;
    connectionsVisible = false;

    Object.keys(particles).forEach((letter, index) => {
        setTimeout(() => {
            particles[letter].forEach(p => p.visible = true);
        }, letterDelays[index]);
    });

    setTimeout(() => {
        connectionsVisible = true;
    }, 5000);

    setTimeout(() => restartAnimation(), 10000);
}

function restartAnimation() {
    connectionsVisible = false;
    Object.keys(particles).forEach(letter => {
        particles[letter].forEach(p => {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
            p.visible = false;
        });
    });

    setTimeout(() => startFormingName(), 1000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Object.keys(particles).forEach(letter => {
        drawLetterParticles(particles[letter]);
        if (connectionsVisible) drawLetterConnections(particles[letter]);
    });
}

function drawLetterParticles(letterParticles) {
    letterParticles.forEach(p => {
        if (p.visible) {
            p.x += (p.targetX - p.x) * 0.05;
            p.y += (p.targetY - p.y) * 0.05;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
            ctx.fill();
        }
    });
}

function drawLetterConnections(letterParticles) {
    for (let i = 0; i < letterParticles.length; i++) {
        for (let j = i + 1; j < letterParticles.length; j++) {
            let p1 = letterParticles[i];
            let p2 = letterParticles[j];
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) { // Kept it close for precise letter formation
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 50})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

createParticles();
startFormingName();
animate();
