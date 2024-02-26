import {BasicStep} from './basicStep'
import {CardFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class TypeOfLoanStep extends BasicStep {
  readonly card: CardFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
  }

  async selectTypeOfLoan(plateName: string) {
    await expect(this.page).toHaveURL(urlData.typeOfLoan)
    await this.card.selectCard(plateName)
  }
}
