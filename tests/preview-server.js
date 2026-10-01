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
      --font-heading: var(--font-primary--family);
      --font-body: var(--font-ui--family);

      --font-label-size: 0.6875rem;
      --font-label-tracking: 0.14em;
      --font-body-size: 0.9375rem;
      --font-body-line-height: 1.6;
      --font-h1: clamp(2.25rem, 5vw, 4.5rem);
      --font-h2: clamp(1.5rem, 3vw, 2.75rem);
      --font-h3: clamp(1.125rem, 2vw, 1.5rem);

      --text-2xs: 0.6875rem;
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 0.9375rem;
      --text-lg: 1.125rem;
      --text-xl: 1.35rem;
      --text-2xl: clamp(1.5rem, 2.5vw, 2rem);
      --text-3xl: clamp(1.85rem, 3.5vw, 2.75rem);
      --text-4xl: clamp(2.25rem, 5vw, 4rem);

      --tracking-wide: 0.04em;
      --tracking-wider: 0.08em;
      --tracking-widest: 0.14em;

      --leading-tight: 1.2;
      --leading-normal: 1.5;
      --leading-relaxed: 1.7;

      --color-background: #FFFFFF;
      --color-foreground: #0A0A0A;
      --color-foreground-muted: #666666;
      --color-accent: #C8A97E;
      --color-sand: #C8A97E;
      --color-border: #E8E8E8;
      --color-surface: #F8F7F5;
      
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
  <link rel="stylesheet" href="/assets/hero.css">
  <link rel="stylesheet" href="/assets/badges.css">
  <link rel="stylesheet" href="/assets/product-card.css">
  <link rel="stylesheet" href="/assets/sections.css">
  <link rel="stylesheet" href="/assets/base.css">

  <script src="/assets/utils.js" defer></script>
  <script src="/assets/announcement-bar.js" defer></script>
  <script src="/assets/header.js" defer></script>
  <script src="/assets/carousel.js" defer></script>
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

  <!-- Main Content: Editorial Homepage -->
  <main id="MainContent" class="main-content" role="main" tabindex="-1">
    <!-- Slice 1: Hero Section (1-up) -->
    <div class="block-container" style="--text-align: center;">
      <div class="hero-section hero-section--1-up full-width" style="--hero-overlay-opacity: 0.35;">
        <div class="hero-tile hero-tile--1 hero-tile--align-center">
          <div class="hero-tile__media">
            <svg class="placeholder-svg hero-tile__placeholder" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="#181818" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#1a1a1a"/>
              <text x="50%" y="50%" fill="#333333" font-size="28" font-family="system-ui" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.2em">ATELIER AUTUMN / WINTER 2026</text>
            </svg>
            <div class="hero-tile__overlay"></div>
          </div>
          <div class="hero-tile__content">
            <span class="hero-tile__kicker">Autumn / Winter 2026</span>
            <h2 class="hero-tile__heading">Architectural Silhouettes</h2>
            <p class="hero-tile__subheading">Pure geometry and tailored volume rendered in Italian double-faced cashmere and raw Japanese denim.</p>
            <div class="hero-tile__cta-wrap">
              <a href="/collections/all" class="button button--hero">
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slice 2: Product Carousel -->
    <section class="block-container" style="--text-align: left;">
      <product-carousel class="product-carousel">
        <div class="product-carousel__header">
          <div class="product-carousel__headings">
            <span class="product-carousel__kicker">New Arrivals</span>
            <h2 class="product-carousel__title">Autumn / Winter Capsule</h2>
          </div>
          <div class="product-carousel__controls">
            <a href="/collections/all" class="product-carousel__view-all">View All</a>
            <div class="product-carousel__nav-btns">
              <button type="button" class="carousel-nav-btn carousel-nav-btn--prev" aria-label="Previous" data-direction="prev">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button type="button" class="carousel-nav-btn carousel-nav-btn--next" aria-label="Next" data-direction="next">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="product-carousel__track-container">
          <div class="product-carousel__track" role="list" tabindex="0">
            <!-- Product 1 -->
            <div class="product-carousel__slide" role="listitem">
              <div class="product-card" data-product-id="1">
                <div class="product-card__media-wrapper">
                  <a href="/products/cashmere-overcoat" class="product-card__media-link" aria-label="Double-Faced Cashmere Overcoat">
                    <div class="product-card__image-container has-secondary-image">
                      <svg class="placeholder-svg product-card__image product-card__image--primary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#F5F3EF"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">CASHMERE OVERCOAT</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">STUDIO FRONT</text>
                      </svg>
                      <svg class="placeholder-svg product-card__image product-card__image--secondary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#EBE7DF"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">CASHMERE OVERCOAT</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">BACK DRAPE</text>
                      </svg>
                    </div>
                  </a>
                  <div class="product-card__badges">
                    <span class="badge badge--new">New</span>
                  </div>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__title">
                    <a href="/products/cashmere-overcoat">Double-Faced Cashmere Overcoat</a>
                  </h3>
                  <div class="price">
                    <span class="price-item price-item--regular">$1,450.00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product 2 -->
            <div class="product-carousel__slide" role="listitem">
              <div class="product-card" data-product-id="2">
                <div class="product-card__media-wrapper">
                  <a href="/products/sculptural-blazer" class="product-card__media-link" aria-label="Sculptural Wool Blazer">
                    <div class="product-card__image-container">
                      <svg class="placeholder-svg product-card__image product-card__image--primary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#F0EDE6"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">SCULPTURAL BLAZER</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">VIRGIN WOOL</text>
                      </svg>
                    </div>
                  </a>
                  <div class="product-card__badges">
                    <span class="badge badge--new">New</span>
                  </div>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__title">
                    <a href="/products/sculptural-blazer">Sculptural Virgin Wool Blazer</a>
                  </h3>
                  <div class="price">
                    <span class="price-item price-item--regular">$890.00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product 3 -->
            <div class="product-carousel__slide" role="listitem">
              <div class="product-card" data-product-id="3">
                <div class="product-card__media-wrapper">
                  <a href="/products/selvage-denim" class="product-card__media-link" aria-label="Raw Selvage Denim Trouser">
                    <div class="product-card__image-container">
                      <svg class="placeholder-svg product-card__image product-card__image--primary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#E9ECEF"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">SELVAGE DENIM</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">14OZ JAPANESE</text>
                      </svg>
                    </div>
                  </a>
                  <div class="product-card__badges">
                    <span class="badge badge--sale">Sale</span>
                  </div>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__title">
                    <a href="/products/selvage-denim">Raw Selvage Denim Trouser</a>
                  </h3>
                  <div class="price price--on-sale">
                    <s class="price-item price-item--compare">$420.00</s>
                    <span class="price-item price-item--sale">$340.00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product 4 -->
            <div class="product-carousel__slide" role="listitem">
              <div class="product-card" data-product-id="4">
                <div class="product-card__media-wrapper">
                  <a href="/products/silk-turtleneck" class="product-card__media-link" aria-label="Seamless Silk Turtleneck">
                    <div class="product-card__image-container">
                      <svg class="placeholder-svg product-card__image product-card__image--primary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#F8F7F4"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">SILK TURTLENECK</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">FINE GAUGE</text>
                      </svg>
                    </div>
                  </a>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__title">
                    <a href="/products/silk-turtleneck">Seamless Silk Turtleneck</a>
                  </h3>
                  <div class="price">
                    <span class="price-item price-item--regular">$360.00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product 5 -->
            <div class="product-carousel__slide" role="listitem">
              <div class="product-card" data-product-id="5">
                <div class="product-card__media-wrapper">
                  <a href="/products/leather-tote" class="product-card__media-link" aria-label="Atelier Calfskin Tote">
                    <div class="product-card__image-container">
                      <svg class="placeholder-svg product-card__image product-card__image--primary" viewBox="0 0 600 800" fill="#222">
                        <rect width="100%" height="100%" fill="#F2EFE9"/>
                        <text x="50%" y="45%" fill="#888" font-size="14" font-family="system-ui" text-anchor="middle" letter-spacing="0.1em">CALFSKIN TOTE</text>
                        <text x="50%" y="55%" fill="#AAA" font-size="11" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">VEGETABLE TANNED</text>
                      </svg>
                    </div>
                  </a>
                </div>
                <div class="product-card__info">
                  <h3 class="product-card__title">
                    <a href="/products/leather-tote">Atelier Calfskin Tote</a>
                  </h3>
                  <div class="price">
                    <span class="price-item price-item--regular">$780.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </product-carousel>
    </section>

    <!-- Slice 3: Philosophy Rich Text -->
    <section class="block-container" style="--text-align: center;">
      <div class="rich-text rich-text--align-center">
        <div class="rich-text__inner">
          <span class="rich-text__kicker">The Philosophy</span>
          <h2 class="rich-text__heading">Made to Endure, Designed with Intention</h2>
          <div class="rich-text__body">
            <p>Each garment originates from a dialogue between raw organic material and structural discipline. We eliminate unnecessary ornament to honor proportion, drape, and tactile longevity.</p>
          </div>
          <div class="rich-text__cta">
            <a href="/pages/about" class="button button--secondary">
              About the Atelier
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Slice 4: Full-Bleed Editorial Banner -->
    <div class="block-container" style="--text-align: left;">
      <div class="editorial-banner full-width">
        <div class="editorial-banner__media">
          <svg class="placeholder-svg editorial-banner__img" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice" fill="#222" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#202020"/>
            <text x="50%" y="50%" fill="#444" font-size="24" font-family="system-ui" text-anchor="middle" letter-spacing="0.2em">ATELIER LOOKBOOK — NORMANDY COAST</text>
          </svg>
          <div class="editorial-banner__overlay"></div>
        </div>
        <div class="editorial-banner__container">
          <div class="editorial-banner__content editorial-banner__content--left">
            <span class="editorial-banner__kicker">Atelier Lookbook — Vol. 04</span>
            <h2 class="editorial-banner__heading">The Form of Quietude</h2>
            <p class="editorial-banner__text">Captured in the raw coastal light of Normandy. Monochromatic tailoring, double-faced cashmere overcoats, and Japanese raw denim rendered in sculptural simplicity.</p>
            <a href="/collections/all" class="button button--editorial">
              Discover the Lookbook
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Slice 5: Image With Text -->
    <section class="block-container" style="--text-align: left;">
      <div class="image-with-text image-with-text--image_first">
        <div class="image-with-text__inner">
          <div class="image-with-text__media">
            <svg class="placeholder-svg image-with-text__img" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" fill="#222" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#EDEAE3"/>
              <text x="50%" y="50%" fill="#999" font-size="16" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">TEXTILE CRAFT ARCHIVE</text>
            </svg>
          </div>
          <div class="image-with-text__content">
            <span class="image-with-text__kicker">Textile Provenance</span>
            <h2 class="image-with-text__heading">Italian Double-Faced Cashmere</h2>
            <div class="image-with-text__text">
              <p>Spun in Biella, Italy from exceptionally fine fibers. Each piece is unlined to reveal the mastery of split-seam hand-finishing, providing featherweight warmth without stiffness.</p>
            </div>
            <div class="image-with-text__cta">
              <a href="/collections/coats" class="button button--secondary">
                Explore Outerwear
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Slice 6: Curated Collections Grid -->
    <section class="block-container" style="--text-align: center;">
      <div class="collection-grid-section">
        <div class="collection-grid__header">
          <span class="collection-grid__kicker">Curated Editions</span>
          <h2 class="collection-grid__title">Shop By Category</h2>
        </div>
        <div class="collection-grid__items">
          <!-- Col 1 -->
          <a href="/collections/tailoring" class="collection-tile">
            <div class="collection-tile__media">
              <svg class="placeholder-svg collection-tile__image" viewBox="0 0 600 800" fill="#222">
                <rect width="100%" height="100%" fill="#E3DFD7"/>
                <text x="50%" y="50%" fill="#777" font-size="16" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">TAILORING</text>
              </svg>
              <div class="collection-tile__overlay"></div>
            </div>
            <div class="collection-tile__content">
              <h3 class="collection-tile__name">Tailoring & Coats</h3>
              <span class="collection-tile__link-text">Discover</span>
            </div>
          </a>

          <!-- Col 2 -->
          <a href="/collections/knitwear" class="collection-tile">
            <div class="collection-tile__media">
              <svg class="placeholder-svg collection-tile__image" viewBox="0 0 600 800" fill="#222">
                <rect width="100%" height="100%" fill="#DDD8CE"/>
                <text x="50%" y="50%" fill="#777" font-size="16" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">KNITWEAR</text>
              </svg>
              <div class="collection-tile__overlay"></div>
            </div>
            <div class="collection-tile__content">
              <h3 class="collection-tile__name">Cashmere Knitwear</h3>
              <span class="collection-tile__link-text">Discover</span>
            </div>
          </a>

          <!-- Col 3 -->
          <a href="/collections/accessories" class="collection-tile">
            <div class="collection-tile__media">
              <svg class="placeholder-svg collection-tile__image" viewBox="0 0 600 800" fill="#222">
                <rect width="100%" height="100%" fill="#D5CFC3"/>
                <text x="50%" y="50%" fill="#777" font-size="16" font-family="system-ui" text-anchor="middle" letter-spacing="0.15em">LEATHER GOODS</text>
              </svg>
              <div class="collection-tile__overlay"></div>
            </div>
            <div class="collection-tile__content">
              <h3 class="collection-tile__name">Leather & Accessories</h3>
              <span class="collection-tile__link-text">Discover</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Slice 7: Dedicated Newsletter -->
    <div class="block-container" style="--text-align: center;">
      <div class="newsletter-section">
        <div class="newsletter-section__inner">
          <span class="newsletter-section__kicker">Join the Circle</span>
          <h2 class="newsletter-section__heading">Private Invitations & Release Access</h2>
          <p class="newsletter-section__subheading">Subscribers receive inaugural capsule preview access, private salon appointments, and editorial monographs.</p>
          <form class="newsletter-section__form" action="#" method="post">
            <div class="newsletter-section__field-row">
              <label for="HomeNewsletterEmail" class="visually-hidden">Email address</label>
              <input
                id="HomeNewsletterEmail"
                type="email"
                name="email"
                class="newsletter-section__input"
                placeholder="Enter your email"
                required
              >
              <button type="submit" class="button--newsletter">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
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
