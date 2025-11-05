import { test as setup } from '../src/fixtures';

setup('install Scalable RTR app', async ({ scalableRTRHomePage }) => {
  // Use the existing navigateToApp() method which handles installation
  await scalableRTRHomePage.navigateToApp();
});
