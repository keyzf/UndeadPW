import {BasicStep} from "./basicStep"
import {CreditProfilePage} from "../pages"
import {expect, Page} from "@playwright/test"
import {FooterFragment} from "../fragments"

export class CreditProfile extends BasicStep {
  public creditProfilePage: CreditProfilePage

  constructor(page: Page) {
    super(page)
    this.creditProfilePage = new CreditProfilePage(page)
  }

  async fillSocialSecurityNumber(number: string) {
    await this.creditProfilePage.socialSecurityNumber.enterValue(number)
    await this.footer.continueButton.click()
  }

  async continue() {
    await expect(this.page).toHaveURL(/.*credit-profile/)
    await this.footer.continueButton.click()
  }
}
