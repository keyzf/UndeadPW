import {Locator, Page} from '@playwright/test';

export class CardFragment {
    readonly page!: Page;
    readonly cardType: Locator;

    constructor(page: Page) {
      this.cardType = page.locator('label[class^="RadioCardstyles__Wrapper"]');
    }

    /**
   * @param title - card title
   */
    async selectCard(title: string) {
        await this.cardType.locator(':scope', {hasText: title}).click();
    }
}
