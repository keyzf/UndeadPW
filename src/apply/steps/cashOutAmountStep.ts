import {BasicStep} from './basicStep'
import {CashOutAmountPage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class CashOutAmountStep extends BasicStep {
  amount: CashOutAmountPage

  constructor(page: Page) {
    super(page)
    this.amount = new CashOutAmountPage(page)
  }
  
  async enterAmount(value: string) {
    await expect(this.page).toHaveURL(urlData.cashOutAmount)
    await this.amount.inputFragment.enterValue(value)
    await this.footer.continueButton.click()
  }
}
