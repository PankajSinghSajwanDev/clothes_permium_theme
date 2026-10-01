/**
 * Maison Editorial — Product Carousel Custom Element (<product-carousel>)
 * Smooth scroll, touch swipe, responsive step calculation, and accessible navigation.
 */
class ProductCarousel extends HTMLElement {
  constructor() {
    super();
    this.track = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.onScroll = this.handleScroll.bind(this);
    this.onKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    this.track = this.querySelector('.product-carousel__track');
    this.prevBtn = this.querySelector('.carousel-nav-btn--prev');
    this.nextBtn = this.querySelector('.carousel-nav-btn--next');

    if (!this.track) return;

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scrollByDirection('prev'));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scrollByDirection('next'));
    }

    this.track.addEventListener('scroll', this.onScroll, { passive: true });
    this.track.addEventListener('keydown', this.onKeyDown);

    // Initial button state
    this.updateButtons();
  }

  disconnectedCallback() {
    if (this.track) {
      this.track.removeEventListener('scroll', this.onScroll);
      this.track.removeEventListener('keydown', this.onKeyDown);
    }
  }

  getStepWidth() {
    const firstSlide = this.track.querySelector('.product-carousel__slide');
    if (!firstSlide) return this.track.clientWidth * 0.8;
    const style = window.getComputedStyle(this.track);
    const gap = parseFloat(style.gap) || 16;
    return firstSlide.getBoundingClientRect().width + gap;
  }

  scrollByDirection(direction) {
    if (!this.track) return;
    const step = this.getStepWidth();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    this.track.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior
    });
  }

  handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollByDirection('prev');
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollByDirection('next');
    }
  }

  handleScroll() {
    window.requestAnimationFrame(() => this.updateButtons());
  }

  updateButtons() {
    if (!this.track) return;
    const scrollLeft = this.track.scrollLeft;
    const maxScroll = this.track.scrollWidth - this.track.clientWidth;

    if (this.prevBtn) {
      this.prevBtn.disabled = scrollLeft <= 4;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = scrollLeft >= maxScroll - 4;
    }
  }
}

if (!customElements.get('product-carousel')) {
  customElements.define('product-carousel', ProductCarousel);
}
