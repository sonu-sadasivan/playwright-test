  const pseudoText2 = await this.page.locator('#panel_center .intro p').evaluate((el) => {
      return window.getComputedStyle(el, '::after').getPropertyValue('content');
        });
