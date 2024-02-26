import {BasicStep} from "./basicStep"
import {expect, Page} from "@playwright/test"

export class ReviewStep extends BasicStep {
  constructor(page: Page) {
    super(page)
  }

  async continue() {
    await expect(this.page).toHaveURL(/.*quick-review/)
    await this.footer.continueButton.click()
  }
}
