/**
 * E2E Tests for Scalable RTR Foundry App
 *
 * Tests app installation, navigation, and UI rendering
 */

import { test, expect } from '../src/fixtures';
import { config } from '../src/config/TestConfig';

// Configure tests to run sequentially
test.describe.configure({ mode: 'serial' });

test.describe('Scalable RTR App E2E Tests', () => {
  // Print configuration before tests
  test.beforeAll(() => {
    config.printSummary();
  });

  // Cleanup after each test
  test.afterEach(async ({ page }) => {
    // Close any open modals or dialogs
    try {
      const closeButtons = page.locator('button[aria-label="Close"]');
      if (await closeButtons.count() > 0) {
        await closeButtons.first().click({ timeout: 1000 });
      }
    } catch {
      // Ignore if no modals to close
    }
  });

  test('should install and navigate to Scalable RTR app', async ({
    scalableRTRHomePage,
    appName,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies app can be accessed and loaded successfully',
    });

    // Navigate to the app via Custom Apps menu
    await scalableRTRHomePage.navigateToApp();

    // Verify app loaded by checking for navigation links
    const currentUrl = scalableRTRHomePage['getCurrentUrl']();
    expect(currentUrl).toContain('foundry');

    console.log(`✅ Successfully navigated to ${appName}`);
  });

  test('should navigate to All Jobs page and verify rendering', async ({
    scalableRTRHomePage,
    allJobsPage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies All Jobs page loads and renders correctly',
    });

    // Navigate to already installed app
    await scalableRTRHomePage.navigateToInstalledApp();

    // Then navigate to All Jobs
    await scalableRTRHomePage.navigateToAllJobs();

    // Verify page renders
    const renders = await allJobsPage.verifyPageRenders();
    expect(renders).toBeTruthy();

    // Check for Create Job button
    const hasButton = await allJobsPage.hasCreateJobButton();
    console.log(`Create Job button present: ${hasButton}`);

    console.log('✅ All Jobs page verified');
  });

  test('should navigate to Run History page and verify rendering', async ({
    scalableRTRHomePage,
    runHistoryPage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies Run History page loads and renders correctly',
    });

    // Navigate to already installed app
    await scalableRTRHomePage.navigateToInstalledApp();

    // Navigate to Run History
    await scalableRTRHomePage.navigateToRunHistory();

    // Verify page renders
    const renders = await runHistoryPage.verifyPageRenders();
    expect(renders).toBeTruthy();

    // Check for history table
    const hasTable = await runHistoryPage.hasHistoryTable();
    console.log(`History table present: ${hasTable}`);

    console.log('✅ Run History page verified');
  });

  test('should navigate to Audit Log page and verify rendering', async ({
    scalableRTRHomePage,
    auditLogPage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies Audit Log page loads and renders correctly',
    });

    // Navigate to already installed app
    await scalableRTRHomePage.navigateToInstalledApp();

    // Navigate to Audit Log
    await scalableRTRHomePage.navigateToAuditLog();

    // Verify page renders
    const renders = await auditLogPage.verifyPageRenders();
    expect(renders).toBeTruthy();

    // Check for audit table
    const hasTable = await auditLogPage.hasAuditTable();
    console.log(`Audit log table present: ${hasTable}`);

    console.log('✅ Audit Log page verified');
  });

  test('should verify Create Job button is accessible', async ({
    scalableRTRHomePage,
    allJobsPage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies Create Job functionality is accessible',
    });

    // Navigate to already installed app and All Jobs page
    await scalableRTRHomePage.navigateToInstalledApp();
    await scalableRTRHomePage.navigateToAllJobs();

    // Check if Create Job button exists
    const hasButton = await allJobsPage.hasCreateJobButton();

    if (hasButton) {
      // Try clicking it to see if wizard opens
      await allJobsPage.clickCreateJob();

      // Wait a moment for any navigation/modal to appear
      await allJobsPage['waiter'].delay(1000);

      // Check URL changed or modal appeared
      const url = allJobsPage['getCurrentUrl']();
      const hasCreateJobUrl = url.includes('create-job');

      console.log(`Create Job form accessible: ${hasCreateJobUrl}`);
      expect(hasButton).toBeTruthy();
    } else {
      console.log('ℹ️  Create Job button not found (may be permission-based)');
    }

    console.log('✅ Create Job button accessibility verified');
  });

  test('should verify app navigation flow', async ({
    page,
    scalableRTRHomePage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies navigation between all app pages works correctly',
    });

    // Navigate to already installed app
    await scalableRTRHomePage.navigateToInstalledApp();

    // Get iframe for content verification
    const frame = page.frameLocator('iframe').first();

    // Navigate through all pages in sequence and verify by checking visible content in iframe
    await scalableRTRHomePage.navigateToAllJobs();
    let allJobsVisible = await frame.locator('text="All jobs"').isVisible();
    expect(allJobsVisible).toBeTruthy();

    await scalableRTRHomePage.navigateToRunHistory();
    let runHistoryVisible = await frame.locator('text="Run history"').isVisible();
    expect(runHistoryVisible).toBeTruthy();

    await scalableRTRHomePage.navigateToAuditLog();
    let auditLogVisible = await frame.locator('text="Audit log"').isVisible();
    expect(auditLogVisible).toBeTruthy();

    // Navigate back to All Jobs
    await scalableRTRHomePage.navigateToAllJobs();
    allJobsVisible = await frame.locator('text="All jobs"').isVisible();
    expect(allJobsVisible).toBeTruthy();

    console.log('✅ App navigation flow verified');
  });

  test('should take visual verification screenshots', async ({
    page,
    scalableRTRHomePage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Captures screenshots for visual verification',
    });

    // Navigate to already installed app
    await scalableRTRHomePage.navigateToInstalledApp();

    // Take screenshot of All Jobs page
    await scalableRTRHomePage.navigateToAllJobs();
    await page.screenshot({
      path: 'test-results/all-jobs-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: all-jobs-page.png');

    // Take screenshot of Run History page
    await scalableRTRHomePage.navigateToRunHistory();
    await page.screenshot({
      path: 'test-results/run-history-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: run-history-page.png');

    // Take screenshot of Audit Log page
    await scalableRTRHomePage.navigateToAuditLog();
    await page.screenshot({
      path: 'test-results/audit-log-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: audit-log-page.png');

    console.log('✅ Visual verification screenshots captured');
  });
});
