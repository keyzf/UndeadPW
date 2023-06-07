import {Locator, Page} from '@playwright/test';

export class AddressFragment {
  readonly page!: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * @param address - address
   * @param zipCode - address
   * @param clear - clear field or not (by default = false)
   */
  async enterAddress({address, zipCode, clear = false}: {address?: string, zipCode?: string, clear?: boolean}) {
    if(address) {
      if(clear) {
        await this.page.locator('[data-testid="address__streetAddressInput"]').clear();
        await this.page.locator('[data-testid="address__streetAddressInput"]').type(address, {delay: 30});
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
      }
      await this.page.locator('[data-testid="address__streetAddressInput"]').type(address, {delay: 30});
      await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
    } else if(zipCode) {
      if(clear) {
        await this.page.locator('[name="zip"]').clear();
        await this.page.locator('[name="zip"]').type(zipCode, {delay: 30});
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
      }
      await this.page.locator('[name="zip"]').type(zipCode, {delay: 30});
      await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
    }
  }
}
