/**
 * E2E Tests for Scalable RTR Foundry App
 *
 * Tests run in parallel mode - each test independently navigates to the app
 * via the Custom Apps menu, matching the rapid-response proven pattern.
 */

import { test, expect } from '../src/fixtures';
import { config } from '@crowdstrike/foundry-playwright';

// Parallel mode: each test gets its own browser context and navigates independently
test.describe.configure({ mode: 'parallel' });

test.describe('Scalable RTR App E2E Tests', () => {
  // Print configuration before tests
  test.beforeAll(() => {
    config.logSummary();
  });

  test('should navigate to Scalable RTR app', async ({
    page,
    scalableRTRHomePage,
    appName,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies app can be accessed and loaded successfully via Custom Apps menu',
    });

    await scalableRTRHomePage.navigateToInstalledApp();

    const currentUrl = page.url();
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

    await scalableRTRHomePage.navigateToInstalledApp();
    await scalableRTRHomePage.navigateToAllJobs();

    const renders = await allJobsPage.verifyPageRenders();
    expect(renders).toBeTruthy();

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

    await scalableRTRHomePage.navigateToInstalledApp();
    await scalableRTRHomePage.navigateToRunHistory();

    const renders = await runHistoryPage.verifyPageRenders();
    expect(renders).toBeTruthy();

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

    await scalableRTRHomePage.navigateToInstalledApp();
    await scalableRTRHomePage.navigateToAuditLog();

    const renders = await auditLogPage.verifyPageRenders();
    expect(renders).toBeTruthy();

    const hasTable = await auditLogPage.hasAuditTable();
    console.log(`Audit log table present: ${hasTable}`);

    console.log('✅ Audit Log page verified');
  });

  test('should verify Create Job button is accessible', async ({
    page,
    scalableRTRHomePage,
    allJobsPage,
  }) => {
    test.info().annotations.push({
      type: 'description',
      description: 'Verifies Create Job functionality is accessible',
    });

    await scalableRTRHomePage.navigateToInstalledApp();
    await scalableRTRHomePage.navigateToAllJobs();

    const hasButton = await allJobsPage.hasCreateJobButton();
    expect(hasButton).toBeTruthy();

    await allJobsPage.clickCreateJob();
    await page.waitForLoadState('domcontentloaded');

    // The Create Job form renders inside the iframe; verify by checking for content
    const frame = page.frameLocator('iframe[name="portal"]').first();
    const createJobHeading = frame.locator('h1', { hasText: /create job/i });
    await expect(createJobHeading).toBeVisible({ timeout: 10000 });

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

    await scalableRTRHomePage.navigateToInstalledApp();

    const frame = page.frameLocator('iframe[name="portal"]').first();

    await scalableRTRHomePage.navigateToAllJobs();
    let allJobsVisible = await frame.locator('text="All jobs"').isVisible();
    expect(allJobsVisible).toBeTruthy();

    await scalableRTRHomePage.navigateToRunHistory();
    let runHistoryVisible = await frame.locator('text="Run history"').isVisible();
    expect(runHistoryVisible).toBeTruthy();

    await scalableRTRHomePage.navigateToAuditLog();
    let auditLogVisible = await frame.locator('text="Audit log"').isVisible();
    expect(auditLogVisible).toBeTruthy();

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

    await scalableRTRHomePage.navigateToInstalledApp();

    await scalableRTRHomePage.navigateToAllJobs();
    await page.screenshot({
      path: 'test-results/all-jobs-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: all-jobs-page.png');

    await scalableRTRHomePage.navigateToRunHistory();
    await page.screenshot({
      path: 'test-results/run-history-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: run-history-page.png');

    await scalableRTRHomePage.navigateToAuditLog();
    await page.screenshot({
      path: 'test-results/audit-log-page.png',
      fullPage: true,
    });
    console.log('📸 Screenshot: audit-log-page.png');

    console.log('✅ Visual verification screenshots captured');
  });
});
