function showResponse() {
    const message = document.getElementById('message');
    const button = document.querySelector('button');
    const heart = document.querySelector('.heart');
    
    message.classList.remove('hidden');
    button.style.display = 'none';
    heart.style.animation = 'none';
    heart.innerHTML = '💝';
    
    // Add confetti effect
    for(let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.color = ['#ff3366', '#ff99cc', '#ffffff'][Math.floor(Math.random() * 3)];
    confetti.innerHTML = ['💖', '💕', '💌'][Math.floor(Math.random() * 3)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
}

function redirectToIndex() {
    window.location.href = "index.html";
}

function redirectToYippie() {
    window.location.href = "YIPPIE.html";
}

function redirectToBruh() {
    window.location.href = "bruh.html";
}

// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff3366', '#ff99cc', '#ffffff', '#ffcc00', '#00ccff'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 + 2;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();

// Play Music
const music = document.getElementById('music');
music.volume = 0.5; // Adjust volume (0 to 1)

document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti');
    const ctx = confettiContainer.getContext('2d');
    confettiContainer.width = window.innerWidth;
    confettiContainer.height = window.innerHeight;

    const confettiCount = 300;
    const confetti = [];

    function randomColor() {
        const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * confettiContainer.width,
                y: Math.random() * confettiContainer.height - confettiContainer.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * confettiCount,
                color: randomColor(),
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, confettiContainer.width, confettiContainer.height);
        confetti.forEach((c, index) => {
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        });

        updateConfetti();
    }

    function updateConfetti() {
        confetti.forEach((c, index) => {
            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle - index / 3) * 15;

            if (c.y > confettiContainer.height) {
                confetti[index] = {
                    x: Math.random() * confettiContainer.width,
                    y: -10,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        });
    }

    createConfetti();
    setInterval(drawConfetti, 20);
});