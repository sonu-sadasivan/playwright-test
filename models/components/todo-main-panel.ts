import { Locator, Page } from '@playwright/test';

import { Component } from './component';

export class TodoMainPanel extends Component {
  static readonly TODOS_TITLE_SELECTOR = 'header[data-testid="header"]>h1';

  readonly todosTitleLabel: Locator;

  constructor(page: Page) {
    super(page.locator(TodoMainPanel.TODOS_TITLE_SELECTOR));
    this.todosTitleLabel = page.locator(
      TodoMainPanel.TODOS_TITLE_SELECTOR
    );
  }

  async isValid(): Promise<boolean> {
    return [
      await this.todosTitleLabel.isVisible(),
    ].every(Boolean);
  }
}
