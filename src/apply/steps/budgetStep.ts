import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {BudgetPage} from '../pages'
import {urlData} from 'data/apply'

export class BudgetStep extends BasicStep {
  budget: BudgetPage

  constructor(page: Page) {
    super(page)
    this.budget = new BudgetPage(page)
  }

  async enterAmount(value: string) {
    await expect(this.page).toHaveURL(urlData.budget)
    await this.budget.inputFragment.enterValue(value)
    await this.footer.continueButton.click()
  }
}
