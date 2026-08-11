import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import process from 'node:process';
import puppeteer from 'puppeteer-core';

const port = 4199;
const baseUrl = `http://127.0.0.1:${port}`;
const chromePath = process.env.CHROME_PATH
  || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome');

await access('dist/index.html');
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not start.');
};

let browser;
try {
  await waitForServer();
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  let capturedLiveAgentPayload;
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().includes('/.netlify/functions/chat')) {
      void request.respond({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Provider unavailable in smoke test' }) });
    } else if (request.url().includes('/.netlify/functions/lead')) {
      try {
        capturedLiveAgentPayload = JSON.parse(request.postData() || '{}');
      } catch {
        capturedLiveAgentPayload = undefined;
      }
      void request.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, deliveryChannel: 'test' }) });
    } else if (request.url().includes('/.netlify/functions/')) {
      void request.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    } else {
      void request.continue();
    }
  });

  const routes = ['/', '/launchpad', '/engineering', '/about-us', '/how-we-help', '/things-we-built', '/success-stories', '/blog', '/book-consultation', '/privacy-policy'];
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    if (!response?.ok()) throw new Error(`${route} returned ${response?.status()}`);
    await page.waitForSelector('main');
    const mainCount = await page.$$eval('main', (elements) => elements.length);
    if (mainCount !== 1) throw new Error(`${route} rendered ${mainCount} main landmarks.`);
  }
  console.log('Routes passed.');

  const expectedBookingUrl = 'https://calendar.app.google/uCcmuLDGudKtHW9V8';
  for (const route of ['/launchpad', '/engineering']) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(`a[href="${expectedBookingUrl}"]`);
    const bookingUrls = await page.$$eval('a[href*="calendar.app.google"]', (links) => links.map((link) => link.href));
    if (!bookingUrls.length || bookingUrls.some((url) => url !== expectedBookingUrl)) {
      throw new Error(`${route} has an incorrect booking destination: ${JSON.stringify(bookingUrls)}`);
    }
  }
  console.log('Google Calendar booking links passed.');

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.navbar-logo .logoImg');
  await page.waitForSelector('.testimonial-section .testimonial-card');
  const logoMetrics = await page.$eval('.navbar-logo .logoImg', (image) => {
    const rect = image.getBoundingClientRect();
    return {
      renderedRatio: rect.width / rect.height,
      intrinsicRatio: image.naturalWidth / image.naturalHeight,
      width: rect.width,
      height: rect.height,
    };
  });
  if (Math.abs(logoMetrics.renderedRatio - logoMetrics.intrinsicRatio) > 0.01) {
    throw new Error(`Navbar logo is stretched: ${JSON.stringify(logoMetrics)}`);
  }
  const testimonialVisuals = await page.$eval('.testimonial-section', (section) => {
    const cards = [...section.querySelectorAll('.testimonial-card')];
    return {
      sectionBackgroundImage: getComputedStyle(section).backgroundImage,
      hasPatternElement: Boolean(section.querySelector('.testimonial-card-pattern')),
      cardBackgrounds: cards.map((card) => getComputedStyle(card).backgroundImage),
    };
  });
  if (testimonialVisuals.sectionBackgroundImage !== 'none' || testimonialVisuals.hasPatternElement) {
    throw new Error(`Testimonials still use decorative background imagery: ${JSON.stringify(testimonialVisuals)}`);
  }
  if (testimonialVisuals.cardBackgrounds.length !== 3 || testimonialVisuals.cardBackgrounds.some((background) => background === 'none')) {
    throw new Error(`Testimonial brand-color cards are missing: ${JSON.stringify(testimonialVisuals)}`);
  }
  console.log('Navbar logo ratio and testimonial styling passed.');
  await page.waitForSelector('a.cta-button');
  await page.waitForSelector('.audit-slide-modal-panel', { timeout: 10_000 });
  const auditPanelMetrics = await page.$eval('.audit-slide-modal-panel', (panel) => {
    const rect = panel.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height, viewportHeight: window.innerHeight };
  });
  if (Math.abs(auditPanelMetrics.top) > 1 || Math.abs(auditPanelMetrics.bottom - auditPanelMetrics.viewportHeight) > 1) {
    throw new Error(`Audit side panel is not viewport-height: ${JSON.stringify(auditPanelMetrics)}`);
  }
  await page.keyboard.press('Escape');
  await page.waitForSelector('.audit-slide-modal-panel', { hidden: true });
  await page.focus('a.cta-button');
  const focusVisible = await page.$eval('a.cta-button', (element) => getComputedStyle(element).outlineStyle !== 'none');
  if (!focusVisible) throw new Error('Primary CTA has no visible keyboard focus indicator.');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.location.pathname === '/launchpad');
  await page.waitForSelector('.site-layout > header a[href="/book-consultation"]');
  await page.focus('.site-layout > header a[href="/book-consultation"]');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.location.pathname === '/book-consultation');
  await page.waitForSelector('#consultation-name');
  console.log('Keyboard conversion path passed.');

  await page.goto(`${baseUrl}/things-we-built`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button[aria-label^="View project:"]');
  await page.$eval('button[aria-label^="View project:"]', (element) => element.click());
  await page.waitForSelector('[role="dialog"][aria-modal="true"]');
  await page.keyboard.press('Escape');
  await page.waitForSelector('[role="dialog"]', { hidden: true });
  console.log('Project modal passed.');

  await page.goto(`${baseUrl}/book-consultation`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#consultation-name');
  await page.type('#consultation-name', 'Smoke Test');
  await page.type('#consultation-phone', '6475550123');
  await page.type('#consultation-email', 'smoke@example.com');
  await page.type('#consultation-company', 'https://example.com');
  await page.$eval('input[name="services"]', (element) => element.click());
  await page.select('#consultation-budget', '$5,500 - $8,500');
  await Promise.all([
    page.waitForSelector('[role="dialog"][aria-modal="true"]'),
    page.$eval('form.creative-form button[type="submit"]', (element) => element.click()),
  ]);
  await page.keyboard.press('Escape');
  await page.waitForSelector('[role="dialog"]', { hidden: true });
  console.log('Consultation form passed.');

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.site-layout > footer #newsletter-email');
  await page.type('.site-layout > footer #newsletter-email', 'newsletter@example.com');
  await Promise.all([
    page.waitForRequest((request) => request.postData()?.includes('newsletter_signup') === true),
    page.$eval('.site-layout > footer form', (form) => form.requestSubmit()),
  ]);
  console.log('Newsletter form passed.');

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.chatbot-launcher');
  await page.click('.chatbot-launcher');
  await page.waitForSelector('.chatbot-window');
  await page.type('#chatbot-message', 'How much does the 14-Day Launchpad cost?');
  await page.$eval('.chatbot-input', (form) => form.requestSubmit());
  await page.waitForFunction(() => [...document.querySelectorAll('.msg.assistant .bubble')].some((bubble) => bubble.textContent?.includes('$5,500')));
  await page.evaluate(() => {
    window.open = (url) => {
      window.__lastOpenedBookingUrl = String(url);
      return null;
    };
  });
  await page.$$eval('.actions .action', (buttons) => {
    const scheduleButton = buttons.find((button) => button.textContent?.trim() === 'Schedule a Call');
    if (!(scheduleButton instanceof HTMLButtonElement)) throw new Error('Schedule a Call action not found');
    scheduleButton.click();
  });
  const chatbotBookingUrl = await page.evaluate(() => window.__lastOpenedBookingUrl);
  if (chatbotBookingUrl !== expectedBookingUrl) {
    throw new Error(`Chatbot opened the wrong booking URL: ${chatbotBookingUrl}`);
  }
  await page.type('#chatbot-message', 'I would like to speak with a live agent');
  await page.$eval('.chatbot-input', (form) => form.requestSubmit());
  await page.waitForSelector('#chatbot-agent-message');
  await page.type('#chatbot-agent-name', 'Chat Smoke Test');
  await page.type('#chatbot-agent-email', 'chat-smoke@example.com');
  await page.type('#chatbot-agent-company', 'Example Ventures');
  await page.type('#chatbot-agent-message', 'I need help choosing the right BrandGoto offer.');
  await page.$eval('.chatbot-modal-content', (form) => form.requestSubmit());
  await page.waitForFunction(() => [...document.querySelectorAll('.msg.assistant .bubble')].some((bubble) => bubble.textContent?.includes('request has been received')));
  if (
    capturedLiveAgentPayload?.requestType !== 'live_agent_ticket'
    || capturedLiveAgentPayload?.recipient !== 'silas@brandgoto.com'
    || capturedLiveAgentPayload?.message !== 'I need help choosing the right BrandGoto offer.'
  ) {
    throw new Error(`Live-agent payload is incomplete: ${JSON.stringify(capturedLiveAgentPayload)}`);
  }
  console.log('Chat knowledge fallback and live-agent ticket passed.');

  await page.setViewport({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.site-layout > header .menu-toggle');
  const mobileVisualMetrics = await page.evaluate(() => {
    const logo = document.querySelector('.navbar-logo .logoImg');
    const card = document.querySelector('.testimonial-card');
    if (!(logo instanceof HTMLImageElement) || !(card instanceof HTMLElement)) return null;
    const logoRect = logo.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    return {
      logoRatio: logoRect.width / logoRect.height,
      logoIntrinsicRatio: logo.naturalWidth / logo.naturalHeight,
      cardWidth: cardRect.width,
      viewportWidth: window.innerWidth,
    };
  });
  if (
    !mobileVisualMetrics
    || Math.abs(mobileVisualMetrics.logoRatio - mobileVisualMetrics.logoIntrinsicRatio) > 0.01
    || mobileVisualMetrics.cardWidth > mobileVisualMetrics.viewportWidth
  ) {
    throw new Error(`Mobile logo/testimonial regression: ${JSON.stringify(mobileVisualMetrics)}`);
  }
  const menuMetrics = await page.$eval('.site-layout > header .menu-toggle', (element) => {
    const rect = element.getBoundingClientRect();
    return {
      label: element.getAttribute('aria-label'),
      expanded: element.getAttribute('aria-expanded'),
      width: rect.width,
      height: rect.height,
    };
  });
  if (!menuMetrics.label || menuMetrics.expanded !== 'false' || menuMetrics.width < 44 || menuMetrics.height < 44) {
    throw new Error(`Mobile menu accessibility regression: ${JSON.stringify(menuMetrics)}`);
  }
  await page.click('.site-layout > header .menu-toggle');
  await page.waitForSelector('.mobile-menu.enhanced');
  const mobilePanelMetrics = await page.$eval('.mobile-menu.enhanced', (panel) => {
    const rect = panel.getBoundingClientRect();
    const navbar = panel.closest('.navbar-container');
    return {
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      viewportHeight: window.innerHeight,
      navbarZIndex: navbar ? Number.parseInt(getComputedStyle(navbar).zIndex, 10) : 0,
    };
  });
  if (
    Math.abs(mobilePanelMetrics.top) > 1
    || Math.abs(mobilePanelMetrics.bottom - mobilePanelMetrics.viewportHeight) > 1
    || mobilePanelMetrics.navbarZIndex <= 10050
  ) {
    throw new Error(`Mobile side panel is not viewport-height: ${JSON.stringify(mobilePanelMetrics)}`);
  }
  await page.waitForFunction(() => {
    const panel = document.querySelector('.mobile-menu.enhanced');
    if (!(panel instanceof HTMLElement)) return false;
    return Math.abs(panel.getBoundingClientRect().right - window.innerWidth) < 1;
  });
  await page.click('.mobile-nav-link');
  await page.waitForFunction(() => window.location.pathname === '/launchpad');
  await page.waitForSelector('.mobile-menu.enhanced', { hidden: true });
  const navigationCloseState = await page.evaluate(() => ({
    hasPanel: Boolean(document.querySelector('.mobile-menu.enhanced')),
    hasBackdrop: Boolean(document.querySelector('.mobile-menu-backdrop')),
    expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
    bodyOverflow: document.body.style.overflow,
  }));
  if (
    navigationCloseState.hasPanel
    || navigationCloseState.hasBackdrop
    || navigationCloseState.expanded !== 'false'
    || navigationCloseState.bodyOverflow !== ''
  ) {
    throw new Error(`Mobile menu remained after route navigation: ${JSON.stringify(navigationCloseState)}`);
  }

  await page.waitForSelector('.menu-toggle', { visible: true });
  await page.click('.menu-toggle');
  await page.waitForSelector('.menu-toggle-close', { visible: true });
  await page.waitForFunction(() => {
    const panel = document.querySelector('.mobile-menu.enhanced');
    if (!(panel instanceof HTMLElement)) return false;
    return Math.abs(panel.getBoundingClientRect().right - window.innerWidth) < 1;
  });
  await page.click('.menu-toggle-close');
  await page.waitForSelector('.mobile-menu.enhanced', { hidden: true });

  await page.click('.menu-toggle');
  await page.waitForSelector('.mobile-menu-backdrop', { visible: true });
  await page.click('.mobile-menu-backdrop');
  await page.waitForSelector('.mobile-menu.enhanced', { hidden: true });
  console.log('Mobile route, close-button, and backdrop navigation passed.');

  await page.click('.chatbot-launcher');
  await page.type('#chatbot-message', 'Please connect me with a live agent');
  await page.click('.send-btn');
  await page.waitForSelector('.chatbot-modal-content');
  const mobileChatMetrics = await page.$eval('.chatbot-modal-content', (dialog) => {
    const rect = dialog.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollHeight: dialog.scrollHeight,
      clientHeight: dialog.clientHeight,
    };
  });
  if (
    mobileChatMetrics.left < 0
    || mobileChatMetrics.right > mobileChatMetrics.viewportWidth
    || mobileChatMetrics.top < 0
    || mobileChatMetrics.bottom > mobileChatMetrics.viewportHeight
    || mobileChatMetrics.clientHeight <= 0
  ) {
    throw new Error(`Mobile live-agent dialog overflows the viewport: ${JSON.stringify(mobileChatMetrics)}`);
  }
  await page.click('.chatbot-cancel');
  await page.click('.chatbot-launcher');
  console.log('Mobile chatbot and visual layout passed.');

  await page.goto(`${baseUrl}/definitely-not-a-route`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  const notFound = await page.$eval('h1', (heading) => heading.textContent?.trim());
  if (notFound !== 'Page not found') throw new Error('404 route did not render the not-found page.');
  console.log('404 route passed.');

  console.log(`Smoke tests passed for ${routes.length} routes, forms, chatbot, modal, mobile menu, and 404.`);
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
