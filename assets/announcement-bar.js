/**
 * Maison Announcement Bar Custom Element
 */

class AnnouncementBar extends HTMLElement {
  constructor() {
    super();
    this.closeBtn = this.querySelector('[data-action="close"]');
    this.messages = Array.from(this.querySelectorAll('.announcement-bar__message'));
    this.currentIndex = 0;
    this.intervalId = null;
  }

  connectedCallback() {
    if (sessionStorage.getItem('maison-announcement-dismissed') === 'true') {
      this.classList.add('is-hidden');
      return;
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.dismiss.bind(this));
    }

    if (this.messages.length > 1) {
      this.startCycling();
    }
  }

  disconnectedCallback() {
    this.stopCycling();
  }

  dismiss() {
    this.classList.add('is-hidden');
    sessionStorage.setItem('maison-announcement-dismissed', 'true');
    this.stopCycling();
  }

  startCycling() {
    this.intervalId = setInterval(() => {
      this.messages[this.currentIndex].hidden = true;
      this.messages[this.currentIndex].classList.remove('active');

      this.currentIndex = (this.currentIndex + 1) % this.messages.length;

      this.messages[this.currentIndex].hidden = false;
      this.messages[this.currentIndex].classList.add('active');
    }, 5000);
  }

  stopCycling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

if (!customElements.get('announcement-bar')) {
  customElements.define('announcement-bar', AnnouncementBar);
}
