import { Locator, Page } from '@playwright/test';

import { Component } from './component';

export class OnboardingPanel extends Component {
  static readonly TODOS_TITLE_SELECTOR = 'header[data-testid="header"]>h1';

  readonly pageTitle: Locator;

  constructor(page: Page, locator?: Locator) {
    super(page.locator(OnboardingPanel.TODOS_TITLE_SELECTOR));
    this.pageTitle = page.locator(
      OnboardingPanel.TODOS_TITLE_SELECTOR
    );
  }

  async isValid(): Promise<boolean> {
    return [
      await this.pageTitle.isVisible(),
    ].every(Boolean);
  }
}
