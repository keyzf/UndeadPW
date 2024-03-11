import {BasicStep} from './basicStep'
import {CardFragment} from '../fragments'
import {DownPaymentPage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class DownPaymentStep extends BasicStep {
  downPayment: DownPaymentPage
  cards: CardFragment

  constructor(page: Page) {
    super(page)
    this.downPayment = new DownPaymentPage(page)
    this.cards = new CardFragment(page)
  }

  async enterAmount(value: string) {
    await expect(this.page).toHaveURL(urlData.downPayment)
    await this.downPayment.inputFragment.enterValue(value)
    await this.footer.continueButton.click()
  }

  async selectDownPaymentCard(plateName?: string) {
    await expect(this.page).toHaveURL(urlData.downPayment)
    if(plateName) {
      await this.cards.selectCard(plateName)
    }
    await this.cards.cardType.first().click()
  }
}
