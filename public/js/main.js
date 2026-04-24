document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navCenter = document.getElementById('primary-nav');

  if (navToggle && navCenter) {
    navToggle.addEventListener('click', () => {
      navCenter.classList.toggle('nav-open');
    });
  }
});

