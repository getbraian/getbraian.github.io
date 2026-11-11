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
// Keep motion optional, stop decoding when the film is offscreen, and respect a
// person's explicit pause even when they scroll away and return.
const film = document.getElementById('header-video');
const filmToggle = document.getElementById('video-toggle');
if (film && filmToggle) {
  let userPaused = false;
  let inView = false;
  const saveData = navigator.connection?.saveData === true;
  const syncFilmLabel = () => {
    filmToggle.textContent = film.paused ? 'Play animation' : 'Pause animation';
    filmToggle.setAttribute('aria-label', film.paused ? 'Play header animation' : 'Pause header animation');
  };
  const stopFilm = () => { film.pause(); syncFilmLabel(); };
  const playFilm = () => { film.play().then(syncFilmLabel).catch(syncFilmLabel); };
  filmToggle.hidden = false;
  film.addEventListener('play', syncFilmLabel);
  film.addEventListener('pause', syncFilmLabel);
  filmToggle.addEventListener('click', () => {
    if (film.paused) { userPaused = false; playFilm(); }
    else { userPaused = true; stopFilm(); }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView && !userPaused && !reducedMotion.matches && !saveData && !document.hidden) playFilm();
      else stopFilm();
    }, {threshold:0.15}).observe(film);
  }
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) stopFilm(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopFilm();
    else if (inView && !userPaused && !reducedMotion.matches && !saveData) playFilm();
  });
}
