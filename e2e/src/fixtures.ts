/**
 * Playwright fixtures for E2E tests
 *
 * Provides dependency injection for page objects and configuration
 */

import { test as base } from '@playwright/test';
import { FoundryHomePage } from './pages/FoundryHomePage';
import { AppManagerPage } from './pages/AppManagerPage';
import { AppCatalogPage } from './pages/AppCatalogPage';
import { ScalableRTRHomePage } from './pages/ScalableRTRHomePage';
import { AllJobsPage } from './pages/AllJobsPage';
import { RunHistoryPage } from './pages/RunHistoryPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { config } from './config/TestConfig';

// Define fixture types
type Fixtures = {
  foundryHomePage: FoundryHomePage;
  appManagerPage: AppManagerPage;
  appCatalogPage: AppCatalogPage;
  scalableRTRHomePage: ScalableRTRHomePage;
  allJobsPage: AllJobsPage;
  runHistoryPage: RunHistoryPage;
  auditLogPage: AuditLogPage;
  appName: string;
};

// Extend base test with fixtures
export const test = base.extend<Fixtures>({
  // Configuration fixture
  appName: async ({}, use) => {
    await use(config.appName);
  },

  // Foundry core page objects
  foundryHomePage: async ({ page }, use) => {
    const foundryHomePage = new FoundryHomePage(page);
    await use(foundryHomePage);
  },

  appManagerPage: async ({ page }, use) => {
    const appManagerPage = new AppManagerPage(page);
    await use(appManagerPage);
  },

  appCatalogPage: async ({ page }, use) => {
    const appCatalogPage = new AppCatalogPage(page);
    await use(appCatalogPage);
  },

  // Scalable RTR page objects
  scalableRTRHomePage: async ({ page }, use) => {
    const scalableRTRHomePage = new ScalableRTRHomePage(page);
    await use(scalableRTRHomePage);
  },

  allJobsPage: async ({ page }, use) => {
    const allJobsPage = new AllJobsPage(page);
    await use(allJobsPage);
  },

  runHistoryPage: async ({ page }, use) => {
    const runHistoryPage = new RunHistoryPage(page);
    await use(runHistoryPage);
  },

  auditLogPage: async ({ page }, use) => {
    const auditLogPage = new AuditLogPage(page);
    await use(auditLogPage);
  },
});

// Export expect from Playwright
export { expect } from '@playwright/test';
