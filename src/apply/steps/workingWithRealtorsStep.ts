import {BasicStep} from './basicStep'
import {CardFragment, StepHeaderFragment} from '../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class WorkingWithRealtorsStep extends BasicStep {
  readonly card: CardFragment
  readonly stepHeader: StepHeaderFragment

  constructor(page: Page) {
    super(page)
    this.card = new CardFragment(page)
    this.stepHeader = new StepHeaderFragment(page)
  }

  async selectWorkingWithRealtor(plateName: string) {
    await expect(this.page).toHaveURL(urlData.workingWithRealtors)
    await this.card.selectCard(plateName)
  }
}
