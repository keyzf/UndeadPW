import {BasicStep} from './basicStep'
import {CompletionPage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class CompletionStep extends BasicStep {
  readonly completionPage: CompletionPage

  constructor(page: Page) {
    super(page)
    this.completionPage = new CompletionPage(page)
  }

  async checkCompletionStep() {
    await expect(this.page).toHaveURL(urlData.completion)
    await this.completionPage.text
  }
}
