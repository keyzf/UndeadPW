import {BasicStep} from './basicStep'
import {CreditProfilePage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

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
    await expect(this.page).toHaveURL(urlData.creditProfile)
    await this.footer.continueButton.click()
  }
}
