import { test as teardown } from '../src/fixtures';

teardown('uninstall Scalable RTR app', async ({ appCatalogPage, appName }) => {
  // Clean up by uninstalling the app after all tests complete
  await appCatalogPage.uninstallApp(appName);
});
