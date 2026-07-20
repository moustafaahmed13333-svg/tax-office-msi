// ===== shared site behavior =====
document.addEventListener('DOMContentLoaded', () => {

  // header scroll state
  const header = document.getElementById('siteHeader');
  const utilityBar = document.querySelector('.utility-bar');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 40;
      header.classList.toggle('scrolled', scrolled);
      if (utilityBar) utilityBar.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
    });
  }

  // mobile menu
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // testimonials slider (only if present on the page)
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.getElementById('testiDots');
  if (slides.length && dotsWrap) {
    let current = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(dot);
    });
    function showSlide(i){
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }
    setInterval(() => showSlide((current + 1) % slides.length), 5000);
  }

  // language toggle — each page defines its own `window.i18n` dictionary
  // before including this script's initLangToggle() call.
  const langBtn = document.getElementById('langToggle');
  if (langBtn && window.i18n) {
    let currentLang = 'ar';
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.i18n[key]) el.innerHTML = window.i18n[key][currentLang === 'ar' ? 0 : 1];
      });
    });
  }

});
