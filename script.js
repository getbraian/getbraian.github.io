const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.documentElement.classList.add('js');
  reveals.forEach(element => observer.observe(element));
}
const progress = document.querySelector('.scroll-progress');
const devices = document.querySelector('.device-stage');
let framePending = false;
function updateScroll() {
  const available = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${available > 0 ? scrollY / available : 0})`;
  if (devices && !reducedMotion.matches && devices.getBoundingClientRect().bottom > 0) {
    devices.style.setProperty('--drift', `${Math.min(scrollY * 0.035, 28)}px`);
  }
  framePending = false;
}
addEventListener('scroll', () => { if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); } }, {passive:true});
addEventListener('resize', updateScroll);
updateScroll();
const status = document.getElementById('copy-status');
let statusTimeout;
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = 'Copied';
    status.textContent = 'Command copied. Paste it into your terminal.';
  } catch {
    status.textContent = 'Copy this command: npx braian';
  }
  status.classList.add('visible');
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => { status.classList.remove('visible'); button.textContent = 'Copy'; }, 3000);
}));
const carousel = document.querySelector('.feature-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-viewport');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const selectors = [...carousel.querySelectorAll('[data-slide]')];
  const playButton = carousel.querySelector('.carousel-play');
  const announcement = document.getElementById('carousel-status');
  let active = 0;
  let automatic = !reducedMotion.matches;
  let visible = false;
  let hovered = false;
  let timer;
  let scrollFrame;
  function updateSelection(index) {
    active = index;
    selectors.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
  }
  function schedule() {
    clearTimeout(timer);
    playButton.textContent = automatic ? 'Pause slideshow' : 'Play slideshow';
    if (automatic && visible && !hovered && !carousel.contains(document.activeElement) && !document.hidden) {
      timer = setTimeout(() => { show((active + 1) % slides.length); schedule(); }, 6000);
    }
  }
  function show(index, manual = false) {
    const previous = active;
    updateSelection(index);
    track.scrollTo({left: index * track.clientWidth, behavior: reducedMotion.matches || Math.abs(previous - index) > 1 ? 'instant' : 'smooth'});
    if (manual) {
      automatic = false;
      announcement.textContent = `${slides[index].dataset.name}, feature ${index + 1} of ${slides.length}`;
      schedule();
    }
  }
  selectors.forEach((button, index) => button.addEventListener('click', () => show(index, true)));
  carousel.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => show((active + Number(button.dataset.direction) + slides.length) % slides.length, true)));
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show((active + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length, true);
  });
  track.addEventListener('pointerdown', () => { automatic = false; schedule(); });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => updateSelection(Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)))));
  }, {passive:true});
  playButton.addEventListener('click', () => { automatic = !automatic; schedule(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => requestAnimationFrame(schedule));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { automatic = !reducedMotion.matches; schedule(); });
  addEventListener('resize', () => track.scrollTo({left:active * track.clientWidth, behavior:'instant'}));
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:0.25}).observe(carousel);
  carousel.querySelector('.carousel-controls').hidden = false;
  schedule();
}
