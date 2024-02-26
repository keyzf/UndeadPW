import {BasicStep} from './basicStep'
import {CardFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class PurposeOfRefinanceStep extends BasicStep {
  readonly card: CardFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
  }

  async selectPurposeOfRefinance(plateName: string) {
    await expect(this.page).toHaveURL(urlData.purposeOfRefinance)
    await this.card.selectCard(plateName)
  }
}
