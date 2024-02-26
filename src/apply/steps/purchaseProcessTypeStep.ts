import {BasicStep} from './basicStep'
import {CardFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class PurchaseProcessTypeStep extends BasicStep {
  readonly card: CardFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
  }

  async selectPurchaseProcessType(plateName: string) {
    await expect(this.page).toHaveURL(urlData.purchaseProcessType)
    await this.card.selectCard(plateName)
  }
}
