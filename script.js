// Basic interactive behavior: mobile nav, reveal-on-scroll, contact form simple handling
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    // simple animation lines
    navToggle.classList.toggle('is-open');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav on link click
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          navToggle.classList.remove('is-open');
        }
      }
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // if you don't want repeated animation, unobserve
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Fill year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form local client-side handling
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  document.getElementById('clear-form').addEventListener('click', () => form.reset());

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill all fields before sending.';
      formNote.style.color = '#b91c1c';
      return;
    }

    // For now we only simulate submission (no backend). Show success message.
    formNote.textContent = 'Thanks! Your message was prepared — send via WhatsApp or email.';
    formNote.style.color = '#064e3b';

    // Optionally prefill whatsapp message link to quickly send:
    const text = encodeURIComponent(`Hello, my name is ${name}. I would like to discuss: ${message} (Email: ${email})`);
    const waLink = `https://wa.me/2349015564085?text=${text}`;

    const sendNow = confirm('Open WhatsApp to send your message? (This will open a new tab)');
    if (sendNow) window.open(waLink, '_blank');
  });
}); 