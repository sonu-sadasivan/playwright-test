type Pseudo = '::before' | '::after' | null;

type Control = {
  selector: string;
  expectedText?: string;        // optional if some controls don't have copy
  textSource?: 'innerText' | 'placeholder' | 'pseudo'; // where to read from
  pseudo?: Pseudo;              // used when textSource === 'pseudo'
};

export class CreateAccountPanel extends Component {
  constructor(private page: Page) { super(); }

  // One source of truth: selector + expected copy + how to read it
  static readonly controls = {
    heading:   { selector: '#panel_center .intro p',               expectedText: 'CREATE AN ACCOUNT',        textSource: 'pseudo',     pseudo: '::after' } satisfies Control,
    subLabel:  { selector: '.attrEntry label[for=PWResetUserMessage1]', expectedText: 'Enter your email to sign up', textSource: 'pseudo',     pseudo: '::after' } satisfies Control,
    email:     { selector: 'li.TextBox.email > div > input',       expectedText: 'Email address',             textSource: 'placeholder' } satisfies Control,
    nextBtn:   { selector: 'button.sendCode',                      expectedText: 'Next',                      textSource: 'innerText'   } satisfies Control,
  } as const;

  // Getters keep usage ergonomic
  get pageHeading()        { return this.page.locator(CreateAccountPanel.controls.heading.selector); }
  get pageSubHeadingLabel(){ return this.page.locator(CreateAccountPanel.controls.subLabel.selector); }
  get emailInput()         { return this.page.locator(CreateAccountPanel.controls.email.selector); }
  get nextButton()         { return this.page.locator(CreateAccountPanel.controls.nextBtn.selector); }

  // Generic helpers can now loop over config
  async isVisible(): Promise<boolean> {
    const { heading, subLabel, email, nextBtn } = CreateAccountPanel.controls;
    const results = await Promise.all([
      this.page.locator(heading.selector).isVisible(),
      this.page.locator(subLabel.selector).isVisible(),
      this.page.locator(email.selector).isVisible(),
      this.page.locator(nextBtn.selector).isVisible(),
      this.page.locator(nextBtn.selector).isDisabled(), // initial state rule
    ]);
    return results.every(Boolean);
  }

  async matchesExpectedCopy(): Promise<boolean> {
    const entries = Object.values(CreateAccountPanel.controls);
    const results = await Promise.all(entries.map(async c => {
      if (!c.expectedText) return true;
      const loc = this.page.locator(c.selector);

      if (c.textSource === 'placeholder') {
        const ph = (await loc.getAttribute('placeholder'))?.trim() ?? '';
        return ph === c.expectedText;
      }

      if (c.textSource === 'pseudo') {
        const raw = await loc.evaluate((el, pseudo) =>
          getComputedStyle(el, pseudo as Pseudo).getPropertyValue('content'),
          c.pseudo ?? '::after'
        );
        const text = (raw ?? '').replace(/^["']?(.*?)["']?$/, '$1').trim();
        return text === c.expectedText;
      }

      // default: innerText
      const txt = (await loc.innerText().catch(() => '')).trim();
      return txt === c.expectedText;
    }));

    return results.every(Boolean);
  }
}
