/* Progressive enhancement: content and screenshot links remain available without JavaScript. */
const tablist = document.querySelector('[role="tablist"]');
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, moveFocus = false) {
  for (const candidate of tabs) {
    const selected = candidate === tab;
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    document.getElementById(candidate.getAttribute('aria-controls')).hidden = !selected;
  }
  if (moveFocus) tab.focus();
}
if (tabs.length) selectTab(tabs[0]);
for (const tab of tabs) tab.addEventListener('click', () => selectTab(tab));
tablist?.addEventListener('keydown', (event) => {
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  if (next === undefined) return;
  event.preventDefault();
  selectTab(tabs[next], true);
});
const dialog = document.querySelector('.image-dialog');
const enlargedImage = dialog.querySelector('img');
const caption = document.getElementById('image-caption');
const sizeButton = dialog.querySelector('.dialog-size');
let previousFocus;
if (typeof dialog.showModal === 'function') {
  for (const link of document.querySelectorAll('[data-zoom]')) {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previousFocus = link;
      enlargedImage.src = link.href;
      enlargedImage.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.title;
      dialog.showModal();
      dialog.querySelector('.dialog-scroll').scrollTop = 0;
      document.body.classList.add('no-scroll');
    });
  }
  sizeButton.addEventListener('click', () => {
    const original = dialog.querySelector('.dialog-scroll').classList.toggle('is-original');
    sizeButton.textContent = original ? 'Fit to screen' : 'Full size';
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    dialog.querySelector('.dialog-scroll').classList.remove('is-original');
    sizeButton.textContent = 'Full size';
    previousFocus?.focus();
    enlargedImage.removeAttribute('src');
  });
}
