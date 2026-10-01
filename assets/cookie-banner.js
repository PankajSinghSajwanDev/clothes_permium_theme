/**
 * Maison Cookie Consent Banner Custom Element
 */

class CookieBanner extends HTMLElement {
  constructor() {
    super();
    this.acceptBtn = this.querySelector('[data-action="accept"]');
    this.declineBtn = this.querySelector('[data-action="decline"]');
  }

  connectedCallback() {
    const consent = localStorage.getItem('maison-cookie-consent');
    if (consent) {
      this.hidden = true;
      return;
    }

    // Check Shopify Customer Privacy API if available
    if (window.Shopify?.customerPrivacy?.shouldShowBanner) {
      if (window.Shopify.customerPrivacy.shouldShowBanner()) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    } else {
      // Default display if no previous choice
      this.hidden = false;
    }

    this.acceptBtn?.addEventListener('click', () => this.handleConsent(true));
    this.declineBtn?.addEventListener('click', () => this.handleConsent(false));
  }

  handleConsent(accepted) {
    if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
      window.Shopify.customerPrivacy.setTrackingConsent(accepted, () => {
        this.finish(accepted);
      });
    } else {
      this.finish(accepted);
    }
  }

  finish(accepted) {
    localStorage.setItem('maison-cookie-consent', accepted ? 'accepted' : 'declined');
    this.hidden = true;
  }
}

if (!customElements.get('cookie-banner')) {
  customElements.define('cookie-banner', CookieBanner);
}
