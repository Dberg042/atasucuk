// Scroll-reveal: [data-reveal] elemanları görünür olunca .is-visible alır.
// Fiyat barı segmentleri de bu sınıfla dolar. prefers-reduced-motion'a saygılı.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((e) => e.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((e) => io.observe(e));
}
