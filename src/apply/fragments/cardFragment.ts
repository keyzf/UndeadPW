import {Locator, Page} from '@playwright/test';

type CardData = {
  name: string,
  disabled: boolean
}


export class CardFragment {
    readonly page: Page;
    readonly cardType: Locator;
    readonly root!: string;

    constructor(page: Page) {
      this.page = page
      this.cardType = page.locator('label');
    }

  /**
   * @param title - card title
   */
    async selectCard(title: string) {
      await this.cardType.filter({ hasText: title }).click();
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

      data.name = await this.cardType.filter({ hasText: title }).innerText();
      data.disabled = await this.cardType.filter({ hasText: title }).isDisabled();

      return data
    }
}
