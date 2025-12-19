// ========== УЛУЧШЕННАЯ СИСТЕМА ТЕМ ==========

let currentTheme = localStorage.getItem('siteTheme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;

  document.documentElement.classList.toggle('light-theme', theme === 'light');
  document.body.classList.toggle('light-theme', theme === 'light');
  document.documentElement.setAttribute('data-theme', theme);

  localStorage.setItem('siteTheme', theme);

  const btn = document.querySelector('.modern-theme-toggle');
  if (btn) {
    btn.classList.toggle('light', theme === 'light');
  }

  if (typeof updateMapTheme === 'function') {
    updateMapTheme(theme);
  }

  console.log('✅ Тема применена:', theme);
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Мгновенное применение (без мигания)
(function() {
  const savedTheme = localStorage.getItem('siteTheme') || 'dark';
  document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
  document.body.classList.toggle('light-theme', savedTheme === 'light');
})();

// Инициализация
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
  });
} else {
  applyTheme(currentTheme);
}
