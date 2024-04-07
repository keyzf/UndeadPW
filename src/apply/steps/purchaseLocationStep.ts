import {AddressFragment, TextFragment} from '../fragments'
import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class PurchaseLocationStep extends BasicStep {
  address: AddressFragment
  errorText: TextFragment

  constructor(page: Page) {
    super(page)
    this.address = new AddressFragment(page)
    this.errorText = new TextFragment(page, 'p[class^="errorText__ErrorText"]')
  }
  
  async enterAddress(value: string) {
    await expect(this.page).toHaveURL(urlData.purchaseLocation)
    await this.address.enterAddress({zipCode: value})
    // No need to delete. animation
    await this.page.waitForTimeout(1000)
    await this.footer.continueButton.click()
  }
}
