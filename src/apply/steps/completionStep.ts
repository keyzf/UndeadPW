import {BasicStep} from "./basicStep"
import {expect, Page} from "@playwright/test"
import {CompletionPage} from "../pages"

export class CompletionStep extends BasicStep {
  readonly completionPage: CompletionPage

  constructor(page: Page) {
    super(page)
    this.completionPage = new CompletionPage(page)
  }

  async checkCompletionStep() {
    await expect(this.page).toHaveURL(/.*completion/)
    await this.completionPage.text
  }
}
