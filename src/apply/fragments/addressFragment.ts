import {Locator, Page} from '@playwright/test';

export class AddressFragment {
  readonly page!: Page;
  readonly addressLocator!: Locator;
  readonly zipCodeLocator!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressLocator = page.locator('[data-testid="address__streetAddressInput"]');
    this.zipCodeLocator = page.locator('[name="zip"]');
  }

    /**
   * @param address - address
   * @param zipCode - address
   * @param clear - clear field or not (by default = false)
   */
  async enterAddress({address, zipCode, clear = false}: {address?: string, zipCode?: string, clear?: boolean}) {
      if(address) {
        if(clear) {
          await this.addressLocator.clear();
          await this.addressLocator.type(address, {delay: 50});
          await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
        }
        await this.addressLocator.type(address, {delay: 50});
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
      } else if(zipCode) {
        if(clear) {
          await this.zipCodeLocator.clear();
          await this.zipCodeLocator.type(zipCode, {delay: 50});
          await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
        }
        await this.zipCodeLocator.type(zipCode, {delay: 50});
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click();
      }
  }
}