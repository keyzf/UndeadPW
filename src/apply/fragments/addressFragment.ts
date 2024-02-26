import {Page} from '@playwright/test'
import {StreetAddress} from '../../shared'
import {InputFragment} from './inputFragment'

export class AddressFragment {
  readonly page!: Page
  readonly streetInput: InputFragment
  readonly cityInput: InputFragment
  readonly zipCodeInput: InputFragment

  constructor(page: Page) {
    this.page = page
    this.streetInput = new InputFragment(page, '[data-testid*="streetAddressInput"]')
    this.cityInput = new InputFragment(page, '[data-testid*="streetAddressInput"]')
    this.zipCodeInput = new InputFragment(page, '[name="zip"]')
  }

  /**
   * @param address - address
   * @param zipCode - address
   * @param clear - clear field or not (by default = false)
   */
  async enterAddress(data: StreetAddress) {
    if(data.address) {
      if(data.clear) {
        await this.streetInput.getLocator().clear()
        await this.streetInput.enterValue(data.address)
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click()
      }
      await this.streetInput.enterValue(data.address)
      await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click()
    } else if(data.zipCode) {
      if(data.clear) {
        await this.zipCodeInput.getLocator().clear()
        await this.zipCodeInput.enterValue(data.zipCode)
        await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click()
      }
      await this.zipCodeInput.enterValue(data.zipCode)
      await this.page.locator('.pac-container').last().locator('[class="pac-item"]').first().click()
    }
  }
}
