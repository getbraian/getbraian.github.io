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
  if (!reducedMotion.matches && devices.getBoundingClientRect().bottom > 0) {
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
