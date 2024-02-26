import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class ReviewStep extends BasicStep {
  constructor(page: Page) {
    super(page)
  }

  async continue() {
    await expect(this.page).toHaveURL(urlData.quickReview)
    await this.footer.continueButton.click()
  }
}
