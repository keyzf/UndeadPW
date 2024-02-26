import {AdditionalQuestionPage} from '../pages'
import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class AdditionalQuestionStep extends BasicStep {
  additionalQuestion: AdditionalQuestionPage

  constructor(page: Page) {
    super(page)
    this.additionalQuestion = new AdditionalQuestionPage(page)
  }

  async enterInsuranceAmountReadyToPay(value: string) {
    await expect(this.page).toHaveURL(urlData.additionalQuestion)
    await this.additionalQuestion.inputFragment.enterValue(value)
    await this.footer.continueButton.click()
  }
}
