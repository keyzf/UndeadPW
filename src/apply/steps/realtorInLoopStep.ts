import {BasicStep} from './basicStep'
import {CardFragment, StepHeaderFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class RealtorInLoopStep extends BasicStep {
  readonly card: CardFragment
  readonly stepHeader: StepHeaderFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
    this.stepHeader = new StepHeaderFragment(page)
  }

  async selectRealtorInLoop(plateName: string) {
    await expect(this.page).toHaveURL(urlData.realtorInLoop)
    await this.card.selectCard(plateName)
  }
}
