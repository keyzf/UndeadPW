import {Locator, Page} from '@playwright/test';

type CardData = {
  name: string,
  disabled: boolean
}


export class CardFragment {
    readonly page!: Page;
    readonly cardType: Locator;
    readonly root!: string;

    constructor(page: Page) {
      this.cardType = page.locator('label[class^="RadioCardstyles__Wrapper"]');
    }

    /**
   * @param title - card title
   */
    async selectCard(title: string) {
        await this.cardType.locator(':scope', {hasText: title}).click();
    }

  /**
  * @param title - card title
  * @return {CardData} card data
  */
    async getData(title: string): Promise<CardData> {
      const data = {
        name: '',
        disabled: false
      }

      data.name = await this.cardType.locator(':scope', {hasText: title}).innerText();
      data.disabled = await this.cardType.locator(':scope', {hasText: title}).isDisabled();

      return data
    }
}
