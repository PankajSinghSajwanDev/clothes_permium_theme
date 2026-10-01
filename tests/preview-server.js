const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

const HTML_CONTENT = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MAISON — Contemporary Atelier</title>

  <!-- Google Font: Cormorant Garamond -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --font-primary--family: "Cormorant Garamond", Georgia, serif;
      --font-primary--style: normal;
      --font-primary--weight: 400;
      --font-ui--family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

      --font-label-size: 0.6875rem;
      --font-label-tracking: 0.14em;
      --font-body-size: 0.9375rem;
      --font-body-line-height: 1.6;
      --font-h1: clamp(2.25rem, 5vw, 4.5rem);
      --font-h2: clamp(1.5rem, 3vw, 2.75rem);
      --font-h3: clamp(1.125rem, 2vw, 1.5rem);

      --color-background: #FFFFFF;
      --color-foreground: #0A0A0A;
      --color-accent: #C8A97E;
      --color-border: #E8E8E8;
      
      --color-grey-100: #F7F7F7;
      --color-grey-200: #EAEAEA;
      --color-grey-500: #888888;
      --color-grey-700: #333333;
      --color-error: #B5292C;
      --color-success: #2D6A4F;

      --sp-1: 0.25rem;
      --sp-2: 0.5rem;
      --sp-3: 0.75rem;
      --sp-4: 1rem;
      --sp-6: 1.5rem;
      --sp-8: 2rem;
      --sp-10: 2.5rem;
      --sp-12: 3rem;
      --sp-16: 4rem;
      --sp-20: 5rem;
      --sp-24: 6rem;
      --sp-32: 8rem;
      --section-padding-y: clamp(var(--sp-12), 6vw, var(--sp-24));

      --page-width: 110rem;
      --page-margin: 32px;
      --header-height: 4.5rem;
      --header-height-mobile: 3.75rem;
      --drawer-width: min(28rem, 100vw);
      --grid-gap: var(--sp-4);
      --grid-gap-desktop: var(--sp-6);

      --border-radius: 0px;
      --style-border-radius-inputs: 0px;
      --border-hairline: 1px solid var(--color-border);

      --z-header: 200;
      --z-drawer: 300;
      --z-overlay: 400;
      --z-modal: 500;
      --z-toast: 600;

      --duration-fast: 150ms;
      --duration-base: 220ms;
      --duration-slow: 350ms;
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
    }
  </style>

  <link rel="stylesheet" href="/assets/critical.css">
  <link rel="stylesheet" href="/assets/a11y.css">
  <link rel="stylesheet" href="/assets/header.css">
  <link rel="stylesheet" href="/assets/footer.css">
  <link rel="stylesheet" href="/assets/modal.css">
  <link rel="stylesheet" href="/assets/base.css">

  <script src="/assets/utils.js" defer></script>
  <script src="/assets/announcement-bar.js" defer></script>
  <script src="/assets/header.js" defer></script>
  <script src="/assets/cookie-banner.js" defer></script>
</head>
<body>
  <a href="#MainContent" class="skip-to-content visually-hidden focusable">
    Skip to content
  </a>

  <!-- Announcement Bar -->
  <announcement-bar class="announcement-bar" style="--announcement-bg: #0A0A0A; --announcement-text: #FFFFFF;">
    <div class="announcement-bar__inner">
      <div class="announcement-bar__messages" role="region" aria-label="Announcement">
        <div class="announcement-bar__message active" data-index="1">
          <a href="/collections/all" class="announcement-bar__link">
            Complimentary Worldwide Express Delivery on Orders Over $300
          </a>
        </div>
        <div class="announcement-bar__message" data-index="2" hidden>
          <a href="/collections/new-arrivals" class="announcement-bar__link">
            New Edition — Autumn / Winter Capsule Available Now
          </a>
        </div>
      </div>
      <button type="button" class="announcement-bar__close" aria-label="Dismiss announcement" data-action="close">
        <svg class="icon icon-close" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </announcement-bar>

  <!-- Site Header -->
  <site-header class="site-header" data-sticky="true" data-hide-on-scroll="true">
    <div class="header__inner">
      <div class="header__left">
        <button type="button" class="header__menu-toggle mobile-only" aria-label="Open menu" aria-expanded="false" aria-controls="MobileNavDrawer" data-action="open-mobile-nav">
          <svg class="icon icon-menu" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
            <line x1="3" y1="7" x2="21" y2="7"></line>
            <line x1="3" y1="17" x2="21" y2="17"></line>
          </svg>
        </button>

        <nav class="header__nav desktop-only" aria-label="Main navigation">
          <ul class="header__nav-list" role="list">
            <li class="header__nav-item has-dropdown">
              <a href="/collections/women" class="header__nav-link" aria-haspopup="true" aria-expanded="false">
                Women
                <svg class="icon icon-chevron-down header__nav-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </a>
              <div class="mega-menu" role="region" aria-label="Women">
                <div class="mega-menu__container">
                  <div class="mega-menu__grid">
                    <div class="mega-menu__column">
                      <a href="/collections/women-ready-to-wear" class="mega-menu__title">Ready-to-Wear</a>
                      <ul class="mega-menu__sublist" role="list">
                        <li><a href="/collections/tailoring" class="mega-menu__sublink">Tailoring</a></li>
                        <li><a href="/collections/coats" class="mega-menu__sublink">Coats & Trench</a></li>
                        <li><a href="/collections/knitwear" class="mega-menu__sublink">Cashmere Knitwear</a></li>
                        <li><a href="/collections/dresses" class="mega-menu__sublink">Silk Dresses</a></li>
                      </ul>
                    </div>
                    <div class="mega-menu__column">
                      <a href="/collections/women-denim" class="mega-menu__title">Denim</a>
                      <ul class="mega-menu__sublist" role="list">
                        <li><a href="/collections/straight-leg" class="mega-menu__sublink">Straight Leg</a></li>
                        <li><a href="/collections/wide-leg" class="mega-menu__sublink">Wide Leg</a></li>
                        <li><a href="/collections/relaxed-fit" class="mega-menu__sublink">Relaxed Atelier Fit</a></li>
                      </ul>
                    </div>
                    <div class="mega-menu__column">
                      <a href="/collections/women-accessories" class="mega-menu__title">Accessories</a>
                      <ul class="mega-menu__sublist" role="list">
                        <li><a href="/collections/leather-goods" class="mega-menu__sublink">Leather Goods</a></li>
                        <li><a href="/collections/footwear" class="mega-menu__sublink">Footwear</a></li>
                        <li><a href="/collections/jewelry" class="mega-menu__sublink">Fine Jewelry</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="header__nav-item has-dropdown">
              <a href="/collections/men" class="header__nav-link" aria-haspopup="true" aria-expanded="false">
                Men
                <svg class="icon icon-chevron-down header__nav-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </a>
              <div class="mega-menu" role="region" aria-label="Men">
                <div class="mega-menu__container">
                  <div class="mega-menu__grid">
                    <div class="mega-menu__column">
                      <a href="/collections/men-outerwear" class="mega-menu__title">Outerwear</a>
                      <ul class="mega-menu__sublist" role="list">
                        <li><a href="/collections/wool-coats" class="mega-menu__sublink">Wool Overcoats</a></li>
                        <li><a href="/collections/trench" class="mega-menu__sublink">Heritage Trench</a></li>
                      </ul>
                    </div>
                    <div class="mega-menu__column">
                      <a href="/collections/men-tailoring" class="mega-menu__title">Tailoring</a>
                      <ul class="mega-menu__sublist" role="list">
                        <li><a href="/collections/blazers" class="mega-menu__sublink">Structured Blazers</a></li>
                        <li><a href="/collections/trousers" class="mega-menu__sublink">Pleated Trousers</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="header__nav-item">
              <a href="/collections/denim" class="header__nav-link">Denim</a>
            </li>
            <li class="header__nav-item">
              <a href="/collections/accessories" class="header__nav-link">Accessories</a>
            </li>
            <li class="header__nav-item">
              <a href="/collections/sale" class="header__nav-link">Sale</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="header__center">
        <h1 class="header__logo-wrapper">
          <a href="/" class="header__logo-link">
            <span class="header__logo-text">MAISON</span>
          </a>
        </h1>
      </div>

      <div class="header__right">
        <button type="button" class="header__action-btn" aria-label="Search" data-action="open-search">
          <svg class="icon icon-search" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
            <circle cx="10.5" cy="10.5" r="7.5"></circle>
            <line x1="16" y1="16" x2="22" y2="22"></line>
          </svg>
        </button>

        <a href="/account/login" class="header__action-btn desktop-only" aria-label="Account">
          <svg class="icon icon-account" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
            <circle cx="12" cy="7.5" r="4.5"></circle>
            <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8"></path>
          </svg>
        </a>

        <a href="/cart" class="header__action-btn header__cart-btn" aria-label="Cart" data-action="open-cart">
          <svg class="icon icon-cart" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
            <path d="M4 7h16l-1.5 13H5.5L4 7z"></path>
            <path d="M8 7V5a4 4 0 018 0v2"></path>
          </svg>
          <span class="header__cart-count" data-cart-count="2">2</span>
        </a>
      </div>
    </div>

    <!-- Mobile Nav Drawer -->
    <div id="MobileNavDrawer" class="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu" hidden>
      <div class="mobile-nav__overlay" data-action="close-mobile-nav"></div>
      <div class="mobile-nav__panel">
        <div class="mobile-nav__header">
          <span class="mobile-nav__title">Menu</span>
          <button type="button" class="mobile-nav__close" aria-label="Close menu" data-action="close-mobile-nav">
            <svg class="icon icon-close" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="mobile-nav__content">
          <!-- Root View -->
          <div class="mobile-nav__view active" data-view="root">
            <ul class="mobile-nav__list" role="list">
              <li class="mobile-nav__item">
                <button type="button" class="mobile-nav__trigger" data-target="view-women" aria-expanded="false">
                  <span>Women</span>
                  <svg class="icon icon-chevron-right" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </li>
              <li class="mobile-nav__item">
                <button type="button" class="mobile-nav__trigger" data-target="view-men" aria-expanded="false">
                  <span>Men</span>
                  <svg class="icon icon-chevron-right" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/denim" class="mobile-nav__link">Denim</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/accessories" class="mobile-nav__link">Accessories</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/sale" class="mobile-nav__link">Sale</a>
              </li>
            </ul>

            <div class="mobile-nav__footer">
              <a href="/account/login" class="mobile-nav__account-link">
                <svg class="icon icon-account" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
                  <circle cx="12" cy="7.5" r="4.5"></circle>
                  <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8"></path>
                </svg>
                <span>Account Login</span>
              </a>
              <div class="localization-selectors">
                <div class="select-wrapper">
                  <select class="localization-form__dropdown">
                    <option value="US">United States (USD $)</option>
                    <option value="GB">United Kingdom (GBP £)</option>
                    <option value="EU">European Union (EUR €)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Women Submenu View -->
          <div class="mobile-nav__view" data-view="view-women" hidden>
            <button type="button" class="mobile-nav__back" data-back="root" aria-label="Back">
              <svg class="icon icon-chevron-left" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>Women</span>
            </button>
            <ul class="mobile-nav__list" role="list">
              <li class="mobile-nav__item">
                <a href="/collections/women" class="mobile-nav__link mobile-nav__link--view-all">All Women's Collection</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/tailoring" class="mobile-nav__link">Tailoring</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/coats" class="mobile-nav__link">Coats & Trench</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/knitwear" class="mobile-nav__link">Cashmere Knitwear</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/dresses" class="mobile-nav__link">Silk Dresses</a>
              </li>
            </ul>
          </div>

          <!-- Men Submenu View -->
          <div class="mobile-nav__view" data-view="view-men" hidden>
            <button type="button" class="mobile-nav__back" data-back="root" aria-label="Back">
              <svg class="icon icon-chevron-left" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>Men</span>
            </button>
            <ul class="mobile-nav__list" role="list">
              <li class="mobile-nav__item">
                <a href="/collections/men" class="mobile-nav__link mobile-nav__link--view-all">All Men's Collection</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/wool-coats" class="mobile-nav__link">Wool Overcoats</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/trench" class="mobile-nav__link">Heritage Trench</a>
              </li>
              <li class="mobile-nav__item">
                <a href="/collections/trousers" class="mobile-nav__link">Pleated Trousers</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </site-header>

  <!-- Main Content Mock -->
  <main id="MainContent" class="main-content" role="main" tabindex="-1" style="min-height: 70vh; padding: 4rem 2rem; max-width: 110rem; margin: 0 auto;">
    <div style="border: 1px solid var(--color-border); padding: 4rem 2rem; text-align: center; background-color: var(--color-grey-100);">
      <span style="font-family: var(--font-ui--family); font-size: var(--font-label-size); letter-spacing: var(--font-label-tracking); text-transform: uppercase; color: var(--color-accent); display: block; margin-bottom: 1rem;">
        Autumn / Winter 2026 Collection
      </span>
      <h2 style="font-family: var(--font-primary--family); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1.5rem;">
        Architectural Silhouettes & Natural Fibers
      </h2>
      <p style="max-width: 48ch; margin: 0 auto 2rem; color: var(--color-grey-700); font-size: 1.0625rem; line-height: 1.7;">
        An exploration of volume, pure geometry, and timeless luxury. Created for individuals who appreciate the harmony between form and textile.
      </p>
      <a href="/collections/all" style="display: inline-block; background-color: var(--color-foreground); color: var(--color-background); font-family: var(--font-ui--family); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 1rem 2.5rem; text-decoration: none;">
        Discover The Capsule
      </a>
    </div>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__grid">
        <div class="site-footer__col site-footer__col--brand">
          <h2 class="site-footer__brand-title">MAISON</h2>
          <p class="site-footer__brand-text">
            An independent atelier crafting architectural silhouettes in refined natural textiles. Designed with intention, made to endure.
          </p>
          <div class="site-footer__social-wrap">
            <span class="site-footer__label">Social Media</span>
            <ul class="social-icons" role="list">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg class="icon icon-social" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  <svg class="icon icon-social" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><line x1="12" y1="9" x2="12" y2="21"></line><path d="M8 14.5c-.8-1.5-.7-3.7.8-5 2.1-1.8 5.6-1.5 6.9.7 1.3 2.1.3 5.4-1.9 6.2-1.3.5-3-.3-3.3-1.6"></path></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="site-footer__col site-footer__col--nav">
          <details class="site-footer__accordion" open>
            <summary class="site-footer__heading">
              <span>Collection</span>
              <svg class="icon icon-chevron-down accordion-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <ul class="site-footer__list" role="list">
              <li><a href="/collections/women" class="site-footer__link">Women's Edition</a></li>
              <li><a href="/collections/men" class="site-footer__link">Men's Edition</a></li>
              <li><a href="/collections/denim" class="site-footer__link">Signature Denim</a></li>
              <li><a href="/collections/accessories" class="site-footer__link">Accessories & Leather</a></li>
            </ul>
          </details>
        </div>

        <div class="site-footer__col site-footer__col--nav">
          <details class="site-footer__accordion" open>
            <summary class="site-footer__heading">
              <span>Client Services</span>
              <svg class="icon icon-chevron-down accordion-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <ul class="site-footer__list" role="list">
              <li><a href="/pages/contact" class="site-footer__link">Atelier Concierge</a></li>
              <li><a href="/pages/shipping-returns" class="site-footer__link">Complimentary Shipping & Returns</a></li>
              <li><a href="/pages/size-guide" class="site-footer__link">Fit & Measurement Guide</a></li>
              <li><a href="/pages/care" class="site-footer__link">Garment Care Advice</a></li>
            </ul>
          </details>
        </div>

        <div class="site-footer__col site-footer__col--newsletter">
          <h2 class="site-footer__heading-static">Newsletter</h2>
          <p class="site-footer__subtext">
            Subscribe to receive curated releases, private invitations, and editorial stories.
          </p>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault(); document.getElementById('nl-success').style.display='flex';">
            <div class="newsletter-field-group">
              <input type="email" class="newsletter-input" placeholder="Enter your email address" required aria-label="Enter your email address">
              <button type="submit" class="newsletter-submit-btn" aria-label="Subscribe">
                <svg class="icon icon-arrow-right" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
              </button>
            </div>
            <p id="nl-success" class="form-status form-status--success" style="display: none;">
              <svg class="icon icon-check" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Thank you for subscribing.
            </p>
          </form>
        </div>
      </div>

      <div class="site-footer__bottom">
        <div class="site-footer__bottom-left">
          <div class="localization-selectors">
            <div class="select-wrapper">
              <select class="localization-form__dropdown">
                <option value="US">United States (USD $)</option>
                <option value="GB">United Kingdom (GBP £)</option>
                <option value="EU">European Union (EUR €)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="site-footer__bottom-right">
          <div class="site-footer__copyright">
            <span>&copy; 2026 MAISON.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Cookie Banner -->
  <cookie-banner id="CookieBanner" class="cookie-banner" role="region" aria-label="Cookie Preferences">
    <div class="cookie-banner__inner">
      <div class="cookie-banner__content">
        <h3 class="cookie-banner__title">Cookie Preferences</h3>
        <p class="cookie-banner__text">
          We use cookies to enhance your browsing experience, deliver tailored content, and analyze site traffic.
          <a href="/pages/privacy" class="cookie-banner__link">Privacy Policy</a>
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-action="decline">
          Decline Non-Essential
        </button>
        <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-action="accept">
          Accept All
        </button>
      </div>
    </div>
  </cookie-banner>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/' || urlPath === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML_CONTENT);
    return;
  }

  if (urlPath.startsWith('/assets/')) {
    const filename = path.basename(urlPath);
    const filePath = path.join(ASSETS_DIR, filename);

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase();
      let contentType = 'text/plain';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.svg') contentType = 'image/svg+xml';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Phase 1 preview server running at http://localhost:${PORT}`);
});
