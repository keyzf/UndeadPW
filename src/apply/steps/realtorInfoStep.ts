import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {RealtorInfoPage} from '../pages'
import {urlData} from 'data/apply'

export type TRealtorInfo = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    share?: boolean
}

export class RealtorInfoStep extends BasicStep {
  realtorInfoPage: RealtorInfoPage

  constructor(page: Page) {
    super(page)
    this.realtorInfoPage = new RealtorInfoPage(page)
  }

  async enterRealtorInfoData(data: TRealtorInfo) {
    // No need to delete waiters. Filling is so fast
    await expect(this.page).toHaveURL(urlData.realtorInfo)
    await this.realtorInfoPage.firstNameInput.enterValue(data.firstName)
    await this.page.waitForTimeout(300)
    await this.realtorInfoPage.lastNameInput.enterValue(data.lastName)
    await this.page.waitForTimeout(300)
    await this.realtorInfoPage.emailInput.enterValue(data.email)
    await this.page.waitForTimeout(300)
    await this.realtorInfoPage.mobileNumberInput.enterValue(data.mobileNumber)
    if(data.share === false) {
      await this.realtorInfoPage.shareLoanCheckbox.uncheck()
    }
    await this.footer.continueButton.click()
  }
}
