import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {PurchasePricePage} from '../pages'
import {urlData} from 'data/apply'

export class PurchasePriceStep extends BasicStep {
  purchasePricePage: PurchasePricePage

  constructor(page: Page) {
    super(page)
    this.purchasePricePage = new PurchasePricePage(page)
  }

  async enterPurchasePrice(value: string) {
    await expect(this.page).toHaveURL(urlData.purchasePrice)
    await this.purchasePricePage.priceInput.enterValue(value)
    await this.footer.continueButton.click()
  }
}
