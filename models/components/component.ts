import { Locator } from '@playwright/test';

import { VisibilityOptions, isHidden, isVisible } from '../../utlis/common-actions';

export abstract class Component {
  readonly componentLocator?: Locator;

  constructor(locator?: Locator) {
    this.componentLocator = locator;
  }

  isVisible(options: Partial<VisibilityOptions> = {}) {
    if (!this.componentLocator) {
      throw new Error('Locator not specified');
    }
    return isVisible(this.componentLocator, options);
  }

  isHidden(options: Partial<VisibilityOptions> = {}) {
    if (!this.componentLocator) {
      throw new Error('Locator not specified');
    }
    return isHidden(this.componentLocator, options);
  }
}
