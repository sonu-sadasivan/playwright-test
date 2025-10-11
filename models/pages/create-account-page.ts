import { Page } from '@playwright/test';

import { TodosSiteData } from '../../utlis/data/constants';
import { LeftSideBarPanel, TodoMainPanel } from '../components';

import { OnboardingPanel } from '../components/onboarding-panel';

export class CreateAccountPage extends OnboardingPanel {
  readonly siteMainPanel: TodoMainPanel;
  readonly siteLeftSideBarPanel: LeftSideBarPanel;

  constructor(page: Page) {
    super(page, ROUTES.APP_SUBSCRIPTIONS);
    this.siteMainPanel = new TodoMainPanel(page);
    this.siteLeftSideBarPanel = new LeftSideBarPanel(page);
  }
}
