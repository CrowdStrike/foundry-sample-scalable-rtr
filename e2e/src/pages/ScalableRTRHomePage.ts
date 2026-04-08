/**
 * ScalableRTRHomePage - Main Scalable RTR app page with navigation
 */

import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/TestConfig';

export class ScalableRTRHomePage extends BasePage {
  constructor(page: Page) {
    super(page, 'ScalableRTRHomePage');
  }

  protected getPagePath(): string {
    // App has dynamic path based on deployment - use navigateToInstalledApp() instead
    return '';
  }

  protected async verifyPageLoaded(): Promise<void> {
    const currentUrl = this.page.url();
    this.logger.info(`Current URL after navigation: ${this.sanitizeUrl(currentUrl)}`);

    // Primary verification: Check for app page URL pattern
    const isFoundryPage = /\/foundry\/page\/[a-f0-9]+/.test(currentUrl);
    if (!isFoundryPage) {
      throw new Error(`Expected Foundry app page URL pattern, but got: ${this.sanitizeUrl(currentUrl)}`);
    }

    this.logger.success(`Successfully navigated to Foundry app page: ${this.sanitizeUrl(currentUrl)}`);

    // Wait for iframe content to load - the app renders inside an iframe
    const frame = this.page.frameLocator('iframe[name="portal"]').first();
    const appContent = frame.locator('text="All jobs"')
      .or(frame.locator('text="Run history"'))
      .or(frame.locator('text="Audit log"'))
      .first();

    await appContent.waitFor({ state: 'visible', timeout: 30000 });
    this.logger.success('Scalable RTR app loaded with iframe content visible');
  }

  /**
   * Navigate to already installed app via Custom Apps menu.
   * Uses menu-based navigation (URLs are lies - menu structure is stable).
   */
  async navigateToInstalledApp(): Promise<void> {
    return this.withTiming(
      async () => {
        const appName = config.appName;
        this.logger.info(`Navigating to already installed app "${appName}"`);

        // Strategy 1: Try "Open app" from the App Catalog detail page
        const openedViaCatalog = await this.tryOpenAppViaCatalog(appName);
        if (openedViaCatalog) return;

        // Strategy 2: Fall back to Custom Apps menu navigation
        this.logger.info('Falling back to Custom Apps menu navigation');
        await this.navigateViaCustomApps();
        await this.verifyPageLoaded();
      },
      'Navigate to Installed App'
    );
  }

  /**
   * Try to open the app via the "Open app" button on its App Catalog detail page.
   * Returns true if successful, false if the button wasn't available.
   */
  private async tryOpenAppViaCatalog(appName: string): Promise<boolean> {
    try {
      this.logger.info('Trying to open app via App Catalog "Open app" button');
      const baseUrl = config.baseUrl;
      const filterParam = encodeURIComponent(`name:~'${appName}'`);
      await this.page.goto(`${baseUrl}/foundry/app-catalog?filter=${filterParam}`);
      await this.page.waitForLoadState('domcontentloaded');

      const appLink = this.page.getByRole('link', { name: appName, exact: true });
      await appLink.waitFor({ state: 'visible', timeout: 15000 });
      await appLink.click();

      const openAppButton = this.page.getByRole('button', { name: 'Open app' });
      await openAppButton.waitFor({ state: 'visible', timeout: 10000 });

      // Set up response listener BEFORE clicking to capture the page entity response
      const pageEntityResponse = this.page.waitForResponse(
        (resp) => resp.url().includes('/api2/ui-extensions/entities/pages/v1'),
        { timeout: 15000 }
      );
      await openAppButton.click();
      this.logger.success('Clicked "Open app" button from App Catalog');

      // Wait for the page entity response and check for 404
      const response = await pageEntityResponse;
      if (response.status() === 404) {
        this.logger.warn('Page entity returned 404, retrying with reload...');
        await this.retryPageLoadAfter404();
      }

      const iframe = this.page.locator('iframe[name="portal"]');
      await iframe.waitFor({ state: 'visible', timeout: 30000 });
      await this.verifyPageLoaded();
      return true;
    } catch (e) {
      this.logger.warn(`"Open app" button not available: ${(e as Error).message}`);
      return false;
    }
  }

  /**
   * Retry page load after a 404 on the page entity endpoint.
   * The service sometimes needs a moment to register newly deployed pages.
   */
  private async retryPageLoadAfter404(maxRetries = 3): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const retryResponse = this.page.waitForResponse(
        (resp) => resp.url().includes('/api2/ui-extensions/entities/pages/v1'),
        { timeout: 15000 }
      );
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');

      const response = await retryResponse;
      if (response.status() !== 404) {
        this.logger.success(`Page entity returned ${response.status()} on retry ${attempt}`);
        return;
      }
      this.logger.warn(`Page entity still 404 on retry ${attempt}/${maxRetries}`);
    }
  }

  /**
   * Navigate via Custom apps menu.
   * Retries with page refresh if Custom Apps button or app submenu entry
   * isn't found (the sidebar sometimes loads without listing all apps).
   */
  private async navigateViaCustomApps(): Promise<void> {
    this.logger.step('Attempting navigation via Custom apps menu');

    await this.navigateToPath('/foundry/home', 'Foundry home page');
    await this.page.waitForLoadState('networkidle');

    const appName = config.appName;
    let appFound = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      const menuButton = this.page.getByTestId('nav-trigger');
      await menuButton.waitFor({ state: 'visible', timeout: 30000 });
      await menuButton.click();
      await this.page.waitForLoadState('networkidle');

      const customAppsButton = this.page.getByRole('button', { name: 'Custom apps' });
      try {
        await customAppsButton.waitFor({ state: 'visible', timeout: 20000 });
        await customAppsButton.click();
        await this.waiter.delay(1500);
        this.logger.info(`Custom apps button found on attempt ${attempt}`);
      } catch (e) {
        this.logger.warn(`Custom apps not visible on attempt ${attempt}, refreshing page...`);
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.waiter.delay(3000);
        continue;
      }

      // Check if the app button appears in the submenu
      const appButtonCheck = this.page.getByRole('button', { name: appName, exact: false }).first();
      try {
        await appButtonCheck.waitFor({ state: 'visible', timeout: 10000 });
        appFound = true;
        this.logger.info(`App '${appName}' found in Custom apps menu on attempt ${attempt}`);
        break;
      } catch (e) {
        this.logger.warn(`App '${appName}' not in Custom apps on attempt ${attempt}, refreshing page...`);
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.waiter.delay(3000);
      }
    }
    if (!appFound) {
      throw new Error(`App '${appName}' not found in Custom apps menu after 5 attempts with page refresh`);
    }

    // Expand the app menu only if not already expanded
    const appButton = this.page.getByRole('button', { name: appName, exact: false }).first();
    await expect(appButton).toBeVisible({ timeout: 10000 });
    const isExpanded = await appButton.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await appButton.click();
      await this.waiter.delay(500);
    }

    // Click the app link
    const appLinks = this.page.getByRole('link').filter({ hasText: /all jobs|scalable.*rtr/i });
    const firstLink = appLinks.first();
    await expect(firstLink).toBeVisible({ timeout: 20000 });
    await firstLink.click();

    this.logger.success('Successfully navigated via Custom apps menu');
  }

  /**
   * Navigate to All Jobs page
   */
  async navigateToAllJobs(): Promise<void> {
    this.logger.step('Navigate to All Jobs page');

    const frame = this.page.frameLocator('iframe[name="portal"]').first();
    const allJobsTab = frame.locator('text="All jobs"').first();
    await allJobsTab.click();
    await this.waiter.delay(500);

    this.logger.success('Navigated to All Jobs page');
  }

  /**
   * Navigate to Run History page
   */
  async navigateToRunHistory(): Promise<void> {
    this.logger.step('Navigate to Run History page');

    const frame = this.page.frameLocator('iframe[name="portal"]').first();
    const runHistoryTab = frame.locator('text="Run history"').first();
    await runHistoryTab.click();
    await this.waiter.delay(500);

    this.logger.success('Navigated to Run History page');
  }

  /**
   * Navigate to Audit Log page
   */
  async navigateToAuditLog(): Promise<void> {
    this.logger.step('Navigate to Audit Log page');

    const frame = this.page.frameLocator('iframe[name="portal"]').first();
    const auditLogTab = frame.locator('text="Audit log"').first();
    await auditLogTab.click();
    await this.waiter.delay(500);

    this.logger.success('Navigated to Audit Log page');
  }
}
