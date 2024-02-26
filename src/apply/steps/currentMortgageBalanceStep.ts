import {BasicStep} from './basicStep'
import {CurrentMortgageBalancePage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class CurrentMortgageBalanceStep extends BasicStep {
  currentMortgageBalancePage: CurrentMortgageBalancePage

  constructor(page: Page) {
    super(page)
    this.currentMortgageBalancePage = new CurrentMortgageBalancePage(page)
  }

  async enterCurrentMortgageBalance(value: string, homeIsPaidOff?: boolean) {
    await expect(this.page).toHaveURL(urlData.currentMortgageBalance)
    await this.currentMortgageBalancePage.inputFragment.enterValue(value)
    if(homeIsPaidOff) {
      await this.currentMortgageBalancePage.checkbox.check()
    } else {
      await this.currentMortgageBalancePage.checkbox.uncheck()
    }
    await this.footer.continueButton.click()
  }
}
