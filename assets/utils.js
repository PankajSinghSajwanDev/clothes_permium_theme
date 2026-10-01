/**
 * Maison Theme Shared Utilities
 */

const FOCUSABLE_ELEMENTS = [
  'button:not([disabled]):not([aria-hidden="true"])',
  '[href]:not([aria-hidden="true"])',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden="true"])',
  'select:not([disabled]):not([aria-hidden="true"])',
  'textarea:not([disabled]):not([aria-hidden="true"])',
  '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])'
].join(',');

let lastActiveElement = null;

export function trapFocus(container, elementToFocus = null) {
  const focusables = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS));
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  lastActiveElement = document.activeElement;

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown);
  (elementToFocus || firstFocusable)?.focus();

  return function cleanup() {
    container.removeEventListener('keydown', handleKeyDown);
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };
}

export function debounce(fn, wait = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

export function setCookie(name, value, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

// Global exposure for non-module script tags if needed
if (typeof window !== 'undefined') {
  window.MaisonUtils = { trapFocus, debounce, getCookie, setCookie };
}
