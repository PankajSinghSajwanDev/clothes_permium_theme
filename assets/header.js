/**
 * Maison Site Header Custom Element
 */

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.isSticky = this.dataset.sticky === 'true';
    this.hideOnScroll = this.dataset.hideOnScroll === 'true';
    this.lastScrollY = window.scrollY;
    this.isTicking = false;

    // Mobile nav drawer elements
    this.mobileNav = this.querySelector('#MobileNavDrawer');
    this.mobileToggle = this.querySelector('[data-action="open-mobile-nav"]');
    this.mobileClose = this.querySelector('.mobile-nav__close');
    this.mobileOverlay = this.querySelector('.mobile-nav__overlay');
    this.removeFocusTrap = null;

    // Mega menu items
    this.navItemsWithDropdown = this.querySelectorAll('.header__nav-item.has-dropdown');
  }

  connectedCallback() {
    if (this.isSticky && this.hideOnScroll) {
      window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    }

    this.initMobileNav();
    this.initDesktopMegaMenu();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const headerHeight = this.offsetHeight || 72;

        if (currentScrollY > this.lastScrollY && currentScrollY > headerHeight) {
          // Scrolling down - hide header
          this.classList.add('header--hidden');
        } else if (currentScrollY < this.lastScrollY) {
          // Scrolling up - show header
          this.classList.remove('header--hidden');
        }

        if (currentScrollY <= 0) {
          this.classList.remove('header--hidden');
        }

        this.lastScrollY = currentScrollY;
        this.isTicking = false;
      });
      this.isTicking = true;
    }
  }

  initDesktopMegaMenu() {
    this.navItemsWithDropdown.forEach((item) => {
      const link = item.querySelector('.header__nav-link');

      item.addEventListener('mouseenter', () => {
        link?.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('mouseleave', () => {
        link?.setAttribute('aria-expanded', 'false');
      });

      item.addEventListener('focusin', () => {
        link?.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('focusout', (event) => {
        if (!item.contains(event.relatedTarget)) {
          link?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  initMobileNav() {
    if (!this.mobileNav) return;

    this.mobileToggle?.addEventListener('click', this.openMobileNav.bind(this));
    this.mobileClose?.addEventListener('click', this.closeMobileNav.bind(this));
    this.mobileOverlay?.addEventListener('click', this.closeMobileNav.bind(this));

    // Drill-down navigation
    const triggers = this.mobileNav.querySelectorAll('[data-target]');
    const backBtns = this.mobileNav.querySelectorAll('[data-back]');
    const views = this.mobileNav.querySelectorAll('.mobile-nav__view');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const targetViewId = trigger.getAttribute('data-target');
        const targetView = this.mobileNav.querySelector(`[data-view="${targetViewId}"]`);
        if (!targetView) return;

        views.forEach((v) => {
          v.hidden = true;
          v.classList.remove('active');
        });

        targetView.hidden = false;
        targetView.classList.add('active');

        // Focus the back button in the newly revealed view for a11y
        const backBtn = targetView.querySelector('.mobile-nav__back');
        backBtn?.focus();
      });
    });

    backBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const backViewId = btn.getAttribute('data-back');
        const backView = this.mobileNav.querySelector(`[data-view="${backViewId}"]`);
        if (!backView) return;

        views.forEach((v) => {
          v.hidden = true;
          v.classList.remove('active');
        });

        backView.hidden = false;
        backView.classList.add('active');

        // Focus the first button/link in the view
        const firstFocus = backView.querySelector('button, a');
        firstFocus?.focus();
      });
    });

    // Close on Escape key
    this.mobileNav.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileNav();
      }
    });
  }

  openMobileNav() {
    if (!this.mobileNav) return;

    this.classList.add('menu-open');
    this.mobileNav.hidden = false;
    this.mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Reset views to root
    const views = this.mobileNav.querySelectorAll('.mobile-nav__view');
    views.forEach((v) => {
      if (v.getAttribute('data-view') === 'root') {
        v.hidden = false;
        v.classList.add('active');
      } else {
        v.hidden = true;
        v.classList.remove('active');
      }
    });

    // Trap focus inside drawer
    if (window.MaisonUtils?.trapFocus) {
      this.removeFocusTrap = window.MaisonUtils.trapFocus(
        this.mobileNav,
        this.mobileClose
      );
    } else {
      this.mobileClose?.focus();
    }
  }

  closeMobileNav() {
    if (!this.mobileNav || this.mobileNav.hidden) return;

    this.classList.remove('menu-open');
    this.mobileNav.hidden = true;
    this.mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (typeof this.removeFocusTrap === 'function') {
      this.removeFocusTrap();
      this.removeFocusTrap = null;
    } else {
      this.mobileToggle?.focus();
    }
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
