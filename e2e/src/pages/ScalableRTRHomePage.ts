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
    const frame = this.page.frameLocator('iframe').first();
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
        await this.navigateViaCustomApps();
        await this.verifyPageLoaded();
      },
      'Navigate to Installed App'
    );
  }

  /**
   * Navigate via Custom apps menu.
   * Follows the rapid-response proven pattern: retry with page refresh if
   * Custom Apps button isn't found (handles platform flakiness).
   */
  private async navigateViaCustomApps(): Promise<void> {
    this.logger.step('Attempting navigation via Custom apps menu');

    await this.navigateToPath('/foundry/home', 'Foundry home page');
    await this.page.waitForLoadState('networkidle');

    // Retry with page refresh if Custom apps menu doesn't appear
    let customAppsFound = false;
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
        customAppsFound = true;
        this.logger.info(`Custom apps button found on attempt ${attempt}`);
        break;
      } catch (e) {
        this.logger.warn(`Custom apps not visible on attempt ${attempt}, refreshing page...`);
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.waiter.delay(3000);
      }
    }
    if (!customAppsFound) {
      throw new Error('Custom apps button not found after 5 attempts with page refresh');
    }

    const appName = config.appName;
    const appButton = this.page.getByRole('button', { name: appName, exact: false }).first();
    await expect(appButton).toBeVisible({ timeout: 20000 });

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

    const frame = this.page.frameLocator('iframe').first();
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

    const frame = this.page.frameLocator('iframe').first();
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

    const frame = this.page.frameLocator('iframe').first();
    const auditLogTab = frame.locator('text="Audit log"').first();
    await auditLogTab.click();
    await this.waiter.delay(500);

    this.logger.success('Navigated to Audit Log page');
  }
}
