  const pseudoText2 = await this.page.locator('#panel_center .intro p').evaluate((el) => {
      return window.getComputedStyle(el, '::after').getPropertyValue('content');
        });


import { Locator, Page } from '@playwright/test';

// import { VisibilityOptions, isHidden, isVisible } from '../../utlis/common-actions';
import { Component } from './components';
import { getTextFromCss } from './../../utils/playwright/playwright-locators'

export class CreateAccountPanel extends Component {
  static readonly PAGE_HEADING_SELECTOR = '#panel_center .intro p';
  static readonly PAGE_SUB_HEADING_LABEL_SELECTOR = '.attrEntry label[for=PWResetUserMessage1]';
  static readonly EMAIL_INPUT_SELECTOR = 'li.TextBox.email>div>input';
  static readonly NEXT_BUTTON_SELECTOR = 'button.sendCode';

  static readonly PAGE_HEADING_TEXT = 'CREATE AN ACCOUNT';
  static readonly PAGE_SUB_HEADING_TEXT = 'Enter your email to sign up';
  static readonly EMAIL_INPUT_TEXT = 'Email address';
  static readonly NEXT_BUTTON_TEXT = 'Next';


  readonly pageHeading: Locator;
  readonly pageSubHeadingLabel: Locator;
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  page: Page;

  constructor(page: Page) {
    super();
    this.pageHeading = page.locator(CreateAccountPanel.PAGE_HEADING_SELECTOR);
    this.pageSubHeadingLabel = page.locator(CreateAccountPanel.PAGE_SUB_HEADING_LABEL_SELECTOR);
    this.emailInput = page.locator(CreateAccountPanel.EMAIL_INPUT_SELECTOR);
    this.nextButton = page.locator(CreateAccountPanel.NEXT_BUTTON_SELECTOR);
    this.page = page;
  }

  async isElementsDisplayed(): Promise<boolean> {
    console.log("sd")
    const state1a = await this.pageHeading.isVisible();
    const state2a = await this.pageSubHeadingLabel.isVisible();
    const state3a = await this.emailInput.isVisible();
    const state4a = await this.nextButton.isVisible();
    const state4c = await this.nextButton.isDisabled();
    console.log("sd")


    return [
      await this.pageHeading.isVisible(),
      await this.pageSubHeadingLabel.isVisible(),
      await this.emailInput.isVisible(),
      await this.nextButton.isVisible(),
      await this.nextButton.isDisabled(),
    ].every(Boolean);
  }

    async isInitialTextAsExpected(): Promise<boolean> {
    const headingText = await getTextFromCss(this.page, CreateAccountPanel.PAGE_HEADING_SELECTOR, '::after');
    const subheadingLabelText = await getTextFromCss(this.page, CreateAccountPanel.PAGE_SUB_HEADING_LABEL_SELECTOR, '::after');
    const emailInputText = await getTextFromCss(this.page, CreateAccountPanel., '::after');
    const nextButtonText = await getTextFromCss(this.page, CreateAccountPanel.PAGE_HEADING_SELECTOR, '::after');
    
    }

  async isElementsDisplayed2(): Promise<boolean> {

    const state1 = await this.pageHeading.textContent();
    const state2 = await this.pageSubHeadingLabel.textContent();
    const state3 = await this.emailInput.textContent();
    const state4 = await this.nextButton.textContent();

    const state1a = await this.pageHeading.isVisible();
    const state2a = await this.pageSubHeadingLabel.isVisible();
    const state3a = await this.emailInput.isVisible();
    const state4a = await this.nextButton.isVisible();

    const state1b = await this.pageHeading.innerText();
    const state2b = await this.pageSubHeadingLabel.innerText();
    const state3b = await this.emailInput.innerText();
    const state4b = await this.nextButton.innerText();

    const state1c = await this.pageHeading.isDisabled();
    const state2c = await this.pageSubHeadingLabel.isDisabled();
    const state3c = await this.emailInput.isDisabled();
    const state4c = await this.nextButton.isDisabled();

    const state1d = await this.pageHeading.isEnabled();
    const state2d = await this.pageSubHeadingLabel.isEnabled();
    const state3d = await this.emailInput.isEnabled();
    const state4d = await this.nextButton.isEnabled();

    const state1e = await this.pageHeading.isHidden();
    const state2e = await this.pageSubHeadingLabel.isHidden();
    const state3e = await this.emailInput.isHidden();
    const state4e = await this.nextButton.isHidden();

    const pseudoText = await this.page.locator('div.intro').evaluate((el) => {
      return window.getComputedStyle(el, '::before').getPropertyValue('content');
    })
    const pseudoText2 = await this.page.locator('#panel_center .intro p').evaluate((el) => {
      return window.getComputedStyle(el, '::after').getPropertyValue('content');
    })

    console.log("sd")
    return [
      await this.pageHeading.isVisible(),
      await this.pageSubHeadingLabel.isVisible(),
      await this.emailInput.isVisible(),
      await this.nextButton.isVisible(),
      await this.nextButton.isDisabled(),
    ].every(Boolean);
  }

}
