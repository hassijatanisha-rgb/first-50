const cards = [...document.querySelectorAll('.card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
let activeFilter = 'all';

function updateLibrary() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matchesFilter = activeFilter === 'all' || card.dataset.theme === activeFilter;
    const matchesSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) visible += 1;
  });
  count.textContent = `${visible} video${visible === 1 ? '' : 's'}`;
  empty.hidden = visible !== 0;
}

filters.forEach((button) => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  updateLibrary();
}));
search.addEventListener('input', updateLibrary);

const dialog = document.querySelector('#player');
const player = dialog.querySelector('video');
const playerTitle = document.querySelector('#player-title');
document.querySelectorAll('.preview').forEach((button) => button.addEventListener('click', () => {
  player.src = button.dataset.video;
  playerTitle.textContent = button.closest('.card').querySelector('h2').textContent;
  dialog.showModal();
  player.play().catch(() => {});
}));
document.querySelector('#close-player').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { player.pause(); player.removeAttribute('src'); player.load(); });

