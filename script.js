// Typed.js setup
new Typed("#typed", {
    strings: [
        "— Software Engineer & Full-Stack Java Developer",
        "— Building Cloud-Ready Microservices with Spring Boot",
        "— Passionate About Scalable & Reliable Systems",
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 1400,
    loop: true,
    cursorChar: "|",
});

// Matrix Rain Effect
(function () {
    const canvas = document.getElementById("matrixBackground");
    const ctx = canvas.getContext("2d", { alpha: true });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,255,136,0.3)";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// Floating Glowing Orbs
(function () {
    const canvas = document.getElementById("particlesBackground");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 25 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.4,
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            gradient.addColorStop(0, `rgba(0,255,136,${p.opacity})`);
            gradient.addColorStop(1, "rgba(0,255,136,0)");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    },
    { threshold: 0.2 }
);
revealElements.forEach((el) => observer.observe(el));

// Resume Modal
const resumeBtn = document.getElementById("resumeBtn");
const modal = document.getElementById("resumeModal");
const modalClose = document.getElementById("modalClose");
if (resumeBtn && modal) {
    resumeBtn.addEventListener("click", () => (modal.style.display = "flex"));
    modalClose &&
        modalClose.addEventListener("click", () => (modal.style.display = "none"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// Parallax Background Effect
let mouseX = 0,
    mouseY = 0,
    targetX = 0,
    targetY = 0;
const root = document.documentElement;

document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 10;
    targetY = (e.clientY / window.innerHeight - 0.5) * 10;
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY * 0.05;
    root.style.setProperty("--bg-scroll-offset", `${scrollY}px`);
});

function animateParallax() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;
    root.style.setProperty("--bg-translate-x", `${mouseX}px`);
    root.style.setProperty("--bg-translate-y", `${mouseY}px`);
    requestAnimationFrame(animateParallax);
}
animateParallax();

// 📬 Contact Form (Formspree)
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/xrboenqw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
    });

    if (response.ok) {
        alert(" Message sent successfully!");
        form.reset();
    } else {
        alert(" Failed to send. Try again later.");
    }
});

// 💬 Contact Form Modal Logic
const openContact = document.getElementById("openContact");
const contactModal = document.getElementById("contactModal");
const contactClose = document.getElementById("contactClose");

if (openContact && contactModal) {
    openContact.addEventListener("click", () => (contactModal.style.display = "flex"));
    contactClose.addEventListener("click", () => (contactModal.style.display = "none"));
    contactModal.addEventListener("click", (e) => {
        if (e.target === contactModal) contactModal.style.display = "none";
    });
}

// 📬 Contact Form Submission (Formspree)
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/your_form_id_here", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
    });

    if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
        contactModal.style.display = "none";
    } else {
        alert("❌ Failed to send. Try again later.");
    }
});
