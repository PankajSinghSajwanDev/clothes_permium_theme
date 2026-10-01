const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe('Phase 1 — Foundation: Tokens, Layout Shell, Header & Footer', () => {

  test('Desktop (1440px): Layout shell, Mega-Menu, Announcement Bar, Footer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3456');

    // 1. Skip link exists
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toHaveAttribute('href', '#MainContent');

    // 2. Announcement bar renders
    const announcementBar = page.locator('announcement-bar');
    await expect(announcementBar).toBeVisible();
    await expect(announcementBar).toContainText('Complimentary Worldwide Express Delivery');

    // 3. Header renders wordmark & navigation
    const header = page.locator('site-header');
    await expect(header).toBeVisible();
    await expect(page.locator('.header__logo-text')).toHaveText('MAISON');
    await expect(page.locator('.header__cart-count')).toHaveText('2');

    // 4. Mega-menu opens on hover
    const womenNavItem = page.locator('.header__nav-item').filter({ hasText: 'Women' });
    await womenNavItem.hover();
    const megaMenu = womenNavItem.locator('.mega-menu');
    await expect(megaMenu).toBeVisible();
    await expect(megaMenu).toContainText('Tailoring');
    await expect(megaMenu).toContainText('Cashmere Knitwear');

    // 5. Footer renders
    const footer = page.locator('footer.site-footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('MAISON');
    await expect(footer).toContainText('An independent atelier');

    // 6. Cookie banner renders
    const cookieBanner = page.locator('#CookieBanner');
    await expect(cookieBanner).toBeVisible();

    // 7. Cookie banner Accept button works
    await page.locator('[data-action="accept"]').click();
    await expect(cookieBanner).toBeHidden();

    // Capture desktop screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase1-desktop-1440.png'), fullPage: true });
  });

  test('Tablet (768px): Header and Footer layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3456');

    // Header and logo visible
    await expect(page.locator('.header__logo-text')).toBeVisible();

    // Footer columns arranged properly
    await expect(page.locator('footer.site-footer')).toBeVisible();

    // Capture tablet screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase1-tablet-768.png'), fullPage: true });
  });

  test('Mobile (375px): Hamburger toggle, drill-down drawer, accordions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3456');

    // 1. Mobile menu toggle is visible
    const menuToggle = page.locator('.header__menu-toggle');
    await expect(menuToggle).toBeVisible();

    // 2. Open mobile drawer
    await menuToggle.click();
    const mobileDrawer = page.locator('#MobileNavDrawer');
    await expect(mobileDrawer).toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // 3. Drill down into Women submenu
    const womenTrigger = mobileDrawer.locator('[data-target="view-women"]');
    await womenTrigger.click();

    const womenView = mobileDrawer.locator('[data-view="view-women"]');
    await expect(womenView).toBeVisible();
    await expect(womenView).toContainText('Silk Dresses');

    // 4. Click Back button to return to root
    const backBtn = womenView.locator('.mobile-nav__back');
    await backBtn.click();
    await expect(mobileDrawer.locator('[data-view="root"]')).toBeVisible();

    // 5. Close mobile drawer
    const closeBtn = mobileDrawer.locator('.mobile-nav__close');
    await closeBtn.click();
    await expect(mobileDrawer).toBeHidden();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // 6. Dismiss announcement bar
    const announcementClose = page.locator('.announcement-bar__close');
    await announcementClose.click();
    await expect(page.locator('announcement-bar')).toHaveClass(/is-hidden/);

    // Capture mobile screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase1-mobile-375.png'), fullPage: true });
  });

  test('Accessibility: Skip link keyboard navigation and focus visible', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3456');

    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });
});
