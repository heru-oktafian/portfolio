function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.getElementById('mobile-menu').addEventListener('click', function() {
  alert('Menu mobile akan ditampilkan di sini!');
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-bar');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width; }, 500);
      });
    }
  });
}, observerOptions);
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

function showMessage() {
  alert('Terima kasih! Pesan Anda telah dikirim.');
}

document.querySelectorAll('button').forEach(button => {
  if (button.textContent.includes('Lihat Detail')) {
    button.addEventListener('click', function() {
      alert('Detail project akan ditampilkan di sini!');
    });
  }
});

document.querySelectorAll('.w-12.h-12.bg-white\\/20').forEach(button => {
  button.addEventListener('click', function() {
    alert('Link ke profil media sosial akan dibuka di sini!');
  });
});
