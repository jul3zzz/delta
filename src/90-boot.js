/* Delta — demarrage. */
(function boot() {
  dbLoad();
  if (DB.theme) document.documentElement.setAttribute('data-theme', DB.theme);
  if (DB.last && DB.users[DB.last]) { login(DB.last); touchStreak(); }
  addEventListener('hashchange', route);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    applySkin();
    const b = $('#themebtn'); if (b) b.textContent = effTheme() === 'dark' ? '☾' : '☀';
  });
  renderApp();
  if (USER) checkSucces();
})();
