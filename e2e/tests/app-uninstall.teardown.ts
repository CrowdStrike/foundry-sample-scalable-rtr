import { test as teardown } from '@playwright/test';
import { ScalableRTRHomePage } from '../src/pages/ScalableRTRHomePage';

teardown('uninstall Scalable RTR app', async ({ page }) => {
  const scalableRTRHomePage = new ScalableRTRHomePage(page);

  // Clean up by uninstalling the app after all tests complete
  await scalableRTRHomePage.uninstallApp();
});
