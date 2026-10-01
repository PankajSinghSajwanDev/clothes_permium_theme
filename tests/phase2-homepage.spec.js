const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe('Phase 2 — Home Page & Reusable Editorial Blocks', () => {

  test('Desktop (1440px): Hero, Product Carousel, Rich Text, Banner, Image-With-Text, Grid, Newsletter', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3456');

    // Dismiss cookie banner to prevent overlay interference
    await page.locator('[data-action="accept"]').click();

    // 1. Hero Section
    const hero = page.locator('.hero-section');
    await expect(hero).toBeVisible();
    await expect(hero.locator('.hero-tile__kicker')).toHaveText('Autumn / Winter 2026');
    await expect(hero.locator('.hero-tile__heading')).toHaveText('Architectural Silhouettes');
    await expect(hero.locator('.button--hero')).toBeVisible();

    // 2. Product Carousel
    const carousel = page.locator('product-carousel');
    await expect(carousel).toBeVisible();
    await expect(carousel.locator('.product-carousel__title')).toHaveText('Autumn / Winter Capsule');

    const slides = carousel.locator('.product-carousel__slide');
    await expect(slides).toHaveCount(5);

    // Verify badges and prices on product cards
    const firstCard = slides.first().locator('.product-card');
    await expect(firstCard.locator('.badge--new')).toHaveText('New');
    await expect(firstCard.locator('.price-item--regular')).toContainText('$1,450.00');

    // Verify sale badge on third card
    const saleCard = slides.nth(2).locator('.product-card');
    await expect(saleCard.locator('.badge--sale')).toHaveText('Sale');
    await expect(saleCard.locator('.price-item--compare')).toContainText('$420.00');
    await expect(saleCard.locator('.price-item--sale')).toContainText('$340.00');

    // Test carousel scroll buttons
    const nextBtn = carousel.locator('.carousel-nav-btn--next');
    const prevBtn = carousel.locator('.carousel-nav-btn--prev');
    const track = carousel.locator('.product-carousel__track');

    // Initially prev button is disabled
    await expect(prevBtn).toBeDisabled();

    // Click next button and verify track scrolled
    await nextBtn.click();
    await page.waitForTimeout(400); // allow smooth scroll to complete
    const scrollPos = await track.evaluate((el) => el.scrollLeft);
    expect(scrollPos).toBeGreaterThan(0);

    // 3. Atelier Philosophy Rich Text
    const richText = page.locator('.rich-text');
    await expect(richText).toBeVisible();
    await expect(richText.locator('.rich-text__heading')).toHaveText('Made to Endure, Designed with Intention');
    await expect(richText.locator('.rich-text__kicker')).toHaveText('The Philosophy');

    // 4. Lookbook Editorial Banner
    const banner = page.locator('.editorial-banner');
    await expect(banner).toBeVisible();
    await expect(banner.locator('.editorial-banner__heading')).toHaveText('The Form of Quietude');
    await expect(banner.locator('.button--editorial')).toBeVisible();

    // 5. Image With Text
    const imgWithText = page.locator('.image-with-text');
    await expect(imgWithText).toBeVisible();
    await expect(imgWithText.locator('.image-with-text__kicker')).toHaveText('Textile Provenance');
    await expect(imgWithText.locator('.image-with-text__heading')).toHaveText('Italian Double-Faced Cashmere');

    // 6. Curated Collections Grid
    const colGrid = page.locator('.collection-grid-section');
    await expect(colGrid).toBeVisible();
    const colTiles = colGrid.locator('.collection-tile');
    await expect(colTiles).toHaveCount(3);
    await expect(colTiles.nth(0)).toContainText('Tailoring & Coats');
    await expect(colTiles.nth(1)).toContainText('Cashmere Knitwear');
    await expect(colTiles.nth(2)).toContainText('Leather & Accessories');

    // 7. Dedicated Newsletter Section
    const newsletter = page.locator('.newsletter-section');
    await expect(newsletter).toBeVisible();
    await expect(newsletter.locator('.newsletter-section__heading')).toHaveText('Private Invitations & Release Access');
    await expect(newsletter.locator('#HomeNewsletterEmail')).toBeVisible();
    await expect(newsletter.locator('.button--newsletter')).toHaveText('Subscribe');

    // Scroll to top to ensure clean full page screenshot with sticky header at rest
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Capture desktop full page screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase2-desktop-1440.png'), fullPage: true });
  });

  test('Tablet (768px): Responsive grid and carousel layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3456');

    // Dismiss cookie banner
    await page.locator('[data-action="accept"]').click();

    // Hero and carousel visible
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('product-carousel')).toBeVisible();

    // Collection grid items
    const colTiles = page.locator('.collection-grid-section .collection-tile');
    await expect(colTiles).toHaveCount(3);

    // Capture tablet full page screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase2-tablet-768.png'), fullPage: true });
  });

  test('Mobile (375px): Full mobile layout, carousel swipe track, stacked cards', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3456');

    // Dismiss cookie banner
    await page.locator('[data-action="accept"]').click();

    // Hero adapts to mobile viewport
    const heroHeading = page.locator('.hero-tile__heading');
    await expect(heroHeading).toBeVisible();

    // Carousel slides are swipe-sized
    const firstSlide = page.locator('.product-carousel__slide').first();
    const box = await firstSlide.boundingBox();
    expect(box.width).toBeGreaterThan(200);

    // Collection tiles stacked
    const colTiles = page.locator('.collection-grid-section .collection-tile');
    await expect(colTiles).toHaveCount(3);

    // Newsletter input and button stack/fit cleanly
    const emailInput = page.locator('#HomeNewsletterEmail');
    await expect(emailInput).toBeVisible();

    // Capture mobile full page screenshot
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'phase2-mobile-375.png'), fullPage: true });
  });

});
