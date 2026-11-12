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
    if (button.hasAttribute('data-copy-icon')) button.title = 'Copied';
    else button.textContent = 'Copied';
    const feedback = button.closest('dialog')?.querySelector('[data-copy-feedback]');
    if (feedback) feedback.textContent = 'Copied. Paste it into your terminal.';
    status.textContent = 'Command copied. Paste it into your terminal.';
  } catch {
    const feedback = button.closest('dialog')?.querySelector('[data-copy-feedback]');
    if (feedback) feedback.textContent = 'Select and copy the command above.';
    status.textContent = 'Copy this command: npx braian';
  }
  status.classList.add('visible');
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => { status.classList.remove('visible'); if (button.hasAttribute('data-copy-icon')) button.title = 'Copy command'; else button.textContent = 'Copy'; }, 3000);
}));
document.querySelectorAll('.feature-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-viewport');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const selectors = [...carousel.querySelectorAll('[data-slide]')];
  const playButton = carousel.querySelector('.carousel-play');
  const counter = document.createElement('span');
  counter.className = 'carousel-count';
  carousel.querySelector('.carousel-controls').append(counter);
  const announcement = carousel.querySelector('[data-carousel-status]');
  let active = 0;
  let automatic = !reducedMotion.matches;
  let visible = false;
  let hovered = false;
  let timer;
  let scrollFrame;
  function updateSelection(index) {
    active = index;
    counter.textContent = `${index + 1} / ${slides.length}`;
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
    const strip = selectors[index].parentElement;
    strip.scrollTo({left: selectors[index].offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + selectors[index].offsetWidth / 2, behavior:"instant"});
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
  updateSelection(0);
  schedule();
});

const film = document.getElementById('feature-video');
if (film) {
  let manualPause = false;
  let inView = false;
  let programmaticPause = false;
  function pauseFilm() { if (!film.paused) { programmaticPause = true; film.pause(); } }
  film.addEventListener('pause', () => { if (!programmaticPause) manualPause = true; programmaticPause = false; });
  film.addEventListener('play', () => { manualPause = false; });
  const mayAutoplay = () => !reducedMotion.matches && !navigator.connection?.saveData && !manualPause && !document.hidden;
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (inView && mayAutoplay()) film.play().catch(() => {}); else if (!inView) pauseFilm();
  }, {threshold:0.45}).observe(film);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseFilm(); else if (inView && mayAutoplay()) film.play().catch(() => {}); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) pauseFilm(); });
}

const localTrial = document.getElementById('local-trial');
if (localTrial?.showModal) {
  document.querySelectorAll('[data-local-trial]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    localTrial.querySelector('[data-copy-feedback]').textContent = '';
    localTrial.showModal();
    document.body.classList.add('dialog-open');
  }));
  localTrial.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  localTrial.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...localTrial.querySelectorAll('a[href], button:not([disabled])')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  localTrial.addEventListener('click', event => {
    if (event.target !== localTrial) return;
    const box = localTrial.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) localTrial.close();
  });
}


// Follow the chapter crossing the reading line just below the sticky menu.
const chapterNav = document.querySelector('.chapter-nav');
if (chapterNav) {
  const chapters = [...chapterNav.querySelectorAll('a[href^="#"]')]
    .map(link => ({link, section: document.querySelector(link.getAttribute('href'))}))
    .filter(chapter => chapter.section);
  let framePending = false;
  let currentLink = null;
  function updateChapter() {
    framePending = false;
    const readingLine = chapterNav.getBoundingClientRect().height + 24;
    let current = null;
    for (const chapter of chapters) {
      if (chapter.section.getBoundingClientRect().top <= readingLine) current = chapter.link;
    }
    if (current === currentLink) return;
    currentLink = current;
    for (const {link} of chapters) {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (current) {
      const linkBox = current.getBoundingClientRect();
      const navBox = chapterNav.getBoundingClientRect();
      if (linkBox.left < navBox.left || linkBox.right > navBox.right) {
        chapterNav.scrollTo({left: current.offsetLeft - (chapterNav.clientWidth - current.offsetWidth) / 2, behavior: 'instant'});
      }
    }
  }
  function scheduleChapter() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateChapter);
  }
  addEventListener('scroll', scheduleChapter, {passive: true});
  addEventListener('resize', scheduleChapter);
  addEventListener('pageshow', scheduleChapter);
  addEventListener('load', scheduleChapter);
  updateChapter();
}
