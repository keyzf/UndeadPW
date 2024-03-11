import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {PersonalInfo} from '../interfaces'
import {PersonalInfoPage} from '../pages'
import {urlData} from 'data/apply'

export class PersonalInfoStep extends BasicStep {
  personalInfo: PersonalInfoPage
  
  constructor(page: Page) {
    super(page)
    this.personalInfo = new PersonalInfoPage(page)
  }

  async enterFirstName(value: string) {
    await this.personalInfo.firstNameInput.enterValue(value)
    await this.page.waitForTimeout(1000)
  }

  async enterLastName(value: string) {
    await this.personalInfo.lastNameInput.enterValue(value)
    await this.page.waitForTimeout(1000)
  }

  async enterEmail(value: string) {
    await this.personalInfo.emailAddressInput.enterValue(value)
  }

  async enterMobileNumber(value: string) {
    await this.personalInfo.mobileNumberInput.enterValue(value)
  }

  async fillPersonalInfoStep(data: PersonalInfo, insteadEmail?: boolean) {
    await expect(this.page).toHaveURL(urlData.personalInfo)
    await this.enterFirstName(data.firstName)
    await this.enterLastName(data.lastName)
    await this.enterEmail(data.email)
    await this.enterMobileNumber(data.mobileNumber)
    await this.personalInfo.termsCheckbox.check()
    await this.page.waitForTimeout(1000)
    await this.personalInfo.receiveCheckbox.check()
    if(insteadEmail) {
      await this.personalInfo.insteadEmail.click()
    } else {
      await this.personalInfo.textByVerificationCodeButton.click()
    }
  }
}
