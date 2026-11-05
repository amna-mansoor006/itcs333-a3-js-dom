document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('todo-form');
  const input      = document.getElementById('todo-input');
  const list       = document.getElementById('todo-list');
  const errorMsg   = document.getElementById('error-msg');
  const counter    = document.getElementById('counter');
  const filterAll  = document.getElementById('filter-all');
  const filterAct  = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${left} item(s) left`;
  }

  function applyFilter(mode) {
    list.querySelectorAll('li').forEach(li => {
      const done = li.classList.contains('completed');
      const show =
        mode === 'all' ||
        (mode === 'active' && !done) ||
        (mode === 'done' && done);
      li.style.display = show ? '' : 'none';
    });
  }

  function addItem(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);

    updateCounter();
    applyFilter(currentFilter);
  }

  function handleAdd() {
    const text = input.value.trim();
    if (!text) {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');
    addItem(text);
    input.value = '';
    input.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAdd();
  });

  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
      updateCounter();
      applyFilter(currentFilter);
      return;
    }

    if (e.target.classList.contains('todo-text') || e.target === li) {
      li.classList.toggle('completed');
      updateCounter();
      applyFilter(currentFilter);
    }
  });

  filterAll.addEventListener('click',  () => { currentFilter = 'all';    applyFilter('all'); });
  filterAct.addEventListener('click',  () => { currentFilter = 'active'; applyFilter('active'); });
  filterDone.addEventListener('click', () => { currentFilter = 'done';   applyFilter('done'); });

  updateCounter();
});
