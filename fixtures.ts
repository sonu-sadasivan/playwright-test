import { test as base, TestInfo } from '@playwright/test';

// import {
//   BasketPage,
// } from './models';
// import { Accessibility, SignIn, skipThirdPartyScripts } from './utils';
// import { LOCALES } from './utils/accounts/shared/constants';
// import { getKibanaLink } from './utils/kibana-link';
// import { mockSearchResults } from './utils/search-mocks';
// import { getSspLink } from './utils/ssp-link';

type MyFixtures = {
  basketPage: BasketPage;
  locale: string;
  signInToAccount: SignIn;
};

const red = '\x1b[31m';
const reset = '\x1b[0m';

export const test = base.extend<MyFixtures>({
  page: async ({ page, signInToAccount }, use, testInfo: TestInfo) => {
    await use(page);
    if (testInfo.status !== testInfo.expectedStatus) {
      const sessionId = await signInToAccount.getSessionId(page.context());
      const kibanaLink = getKibanaLink(sessionId);
      const sspLink = getSspLink(sessionId);
      const pool = signInToAccount.getPool();
      const skyId = await signInToAccount.getCachedAccount(pool);
      const extraMessage = [
        `\n`,
        `Pool:              ${red}${pool}${reset}`,
        `Sky ID:            ${red}${skyId}${reset}`,
        `Current Page URL:  ${red}${page.url()}${reset}`,
        `Session ID:        ${red}${sessionId}${reset}`,
        `SSP Link:          ${red}${sspLink}${reset}`,
        `Kibana Link:       ${red}${kibanaLink}${reset}`,
      ].join('\n');
      // append to the failing test stacktrace
      testInfo.errors[0].stack += extraMessage;
    }
  },
});
export { expect } from '@playwright/test';
