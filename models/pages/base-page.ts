import { Page } from '@playwright/test';

type WaitMethod = 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
type isActivePageProps = { wait?: boolean; waitMethod: WaitMethod };

export abstract class BasePage {
  page: Page;
  private path: string;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async isActivePage(
    { wait, waitMethod }: isActivePageProps = { wait: true, waitMethod: 'load' }
  ): Promise<boolean> {
    const isPathCorrect = RegExp(this.path).test(this.page.url().toString());

    if (!wait) {
      return isPathCorrect;
    }

    if (isPathCorrect) {
      await this.waitForFullContentLoad(waitMethod);
      return true;
    }

    throw Error('Expected url is not active');
  }

  async waitForFullContentLoad(waitMethod: WaitMethod) {
    await this.page.waitForURL(RegExp(this.path), { waitUntil: waitMethod });
  }

  async navigate(query?: string) {
    const url = new URL(
      process.env.APPLICATION_EXTERNAL_BASE_PATH + this.path,
      process.env.APPLICATION_EXTERNAL_HOST
    );
    const urlSearchParams = new URLSearchParams(query);
    urlSearchParams.forEach((key, value) => url.searchParams.append(value, key));
    await this.page.goto(url.href, { waitUntil: 'networkidle' });
  }
}
