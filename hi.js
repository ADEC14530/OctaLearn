// index.js (replace the whole file)
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  if (!navMenu) {
    console.warn('⚠️ nav-menu element not found');
    return;
  }
  if (!navToggle) {
    console.warn('⚠️ nav-toggle element not found');
    return;
  }

  console.log('✅ nav script loaded');

  // Toggle mobile menu
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent document click from closing immediately
    const opened = navMenu.classList.toggle('show-menu');
    // IMPORTANT: use 'active' to match your CSS (.nav__toggle.active ...)
    navToggle.classList.toggle('active', opened);

    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    navMenu.setAttribute('aria-hidden', opened ? 'false' : 'true');

    console.log('📂 Hamburger clicked — menu open:', opened);
    // quick DOM sanity check
    console.log('   classes:', navToggle.className, navMenu.className);
  });

  // Mobile "Tools" submenu handling
  document.querySelectorAll('.nav__dropdown').forEach(drop => {
    const trigger = drop.querySelector('.nav__link');
    const submenu = drop.querySelector('.dropdown__menu');

    if (!trigger || !submenu) return;

    trigger.addEventListener('click', (ev) => {
      if (window.innerWidth <= 992) {
        ev.preventDefault();

        // close other submenus
        document.querySelectorAll('.dropdown__menu.show-dropdown').forEach(m => {
          if (m !== submenu) m.classList.remove('show-dropdown');
        });

        const nowOpen = submenu.classList.toggle('show-dropdown');
        drop.classList.toggle('open', nowOpen);

        console.log('📂 Tools submenu toggled — open:', nowOpen);
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (ev) => {
    if (window.innerWidth <= 992) {
      if (!navMenu.contains(ev.target) && !navToggle.contains(ev.target)) {
        if (navMenu.classList.contains('show-menu')) {
          navMenu.classList.remove('show-menu');
          navToggle.classList.remove('active'); // <-- match 'active'
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.setAttribute('aria-hidden', 'true');

          document.querySelectorAll('.dropdown__menu.show-dropdown').forEach(m => m.classList.remove('show-dropdown'));
          console.log('🔒 Closed menu by outside click');
        }
      }
    }
  });

  // Reset nav on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      navMenu.classList.remove('show-menu');
      navToggle.classList.remove('active'); // <-- match 'active'

      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-hidden', 'false');

      document.querySelectorAll('.dropdown__menu.show-dropdown').forEach(m => m.classList.remove('show-dropdown'));
      document.querySelectorAll('.nav__dropdown.open').forEach(d => d.classList.remove('open'));
      console.log('↔️ Reset nav for desktop width');
    }
  });
});
