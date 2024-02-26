import {BasicStep} from './basicStep'
import {CardFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class PropertyUsageDetailsStep extends BasicStep {
  readonly card: CardFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
  }

  async selectPropertyUsageDetails(plateName: string) {
    await expect(this.page).toHaveURL(urlData.propertyUsageDetails)
    await this.card.selectCard(plateName)
  }
}
