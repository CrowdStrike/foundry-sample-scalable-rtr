import { test as baseTest } from '@playwright/test';
import { config } from '@crowdstrike/foundry-playwright';
import { ScalableRTRHomePage } from './pages/ScalableRTRHomePage';
import { AllJobsPage } from './pages/AllJobsPage';
import { RunHistoryPage } from './pages/RunHistoryPage';
import { AuditLogPage } from './pages/AuditLogPage';

type FoundryFixtures = {
  scalableRTRHomePage: ScalableRTRHomePage;
  allJobsPage: AllJobsPage;
  runHistoryPage: RunHistoryPage;
  auditLogPage: AuditLogPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  scalableRTRHomePage: async ({ page }, use) => {
    await use(new ScalableRTRHomePage(page));
  },

  allJobsPage: async ({ page }, use) => {
    await use(new AllJobsPage(page));
  },

  runHistoryPage: async ({ page }, use) => {
    await use(new RunHistoryPage(page));
  },

  auditLogPage: async ({ page }, use) => {
    await use(new AuditLogPage(page));
  },

  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';
