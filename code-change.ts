  const pseudoText2 = await this.page.locator('#panel_center .intro p').evaluate((el) => {
      return window.getComputedStyle(el, '::after').getPropertyValue('content');
        });


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
