import {AdditionalInformation, FullPersonalInfo, YourContactInformation, YourName} from '../interfaces'
import {BasicStep} from './basicStep'
import {FullPersonalInfoPage} from '../pages'
import {ModalFragment} from '../fragments/commonFragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class FullPersonalInfoStep extends BasicStep {
  fullPersonalInfo: FullPersonalInfoPage
  modal: ModalFragment

  constructor(page: Page) {
    super(page)
    this.fullPersonalInfo = new FullPersonalInfoPage(page)
    this.modal = new ModalFragment(page)
  }

  /**
   *
   * @param data firstName, middleName, lastName, suffix
   */
  async fillYourName(data: YourName) {
    await this.fullPersonalInfo.firstNameInput.enterValue(data.firstName, true)
    await this.fullPersonalInfo.lastNameInput.enterValue(data.lastName, true)
    if(data.middleName && data.suffix) {
      await this.fullPersonalInfo.middleNameInput.enterValue(data.middleName, true)
      await this.fullPersonalInfo.suffixDropdown.selectValue(data.suffix)
    }
  }

  /**
   *
   * @param data email, cellPhoneNumber, homeNumber, workNumber
   */
  async fillContactInformation(data: YourContactInformation) {
    await this.fullPersonalInfo.emailInput.enterValue(data.email, true)
    await this.fullPersonalInfo.cellPhoneNumberInput.enterValue(data.cellPhoneNumber, true)
    if(data.homeNumber && data.workNumber) {
      await this.fullPersonalInfo.homeNumberInput.enterValue(data.homeNumber, true)
      await this.fullPersonalInfo.workNumberInput.enterValue(data.workNumber, true)
    }
  }

  /**
   *
   * @param data dateOfBirth, maritalStatus, citizenshipStatus, dependents, ageOfDependents
   */
  async fillAdditionalInformation(data: AdditionalInformation) {
    await this.fullPersonalInfo.dateOfBirthInput.enterValue(data.dateOfBirth)
    await this.fullPersonalInfo.maritalStatusDropdown.selectValue(data.maritalStatus)
    await this.fullPersonalInfo.citizenshipStatusDropdown.selectValue(data.citizenshipStatus)
    if(data.dependents && data.ageOfDependents) {
      await this.fullPersonalInfo.numberOfDependentsDropdown.selectValue(data.dependents)
      for(let i= 0; i <= Number(data.dependents); i++) {
        await this.fullPersonalInfo.ageDependentsInput(String(i)).enterValue(data.ageOfDependents)
      }
    }
  }

  /**
   *
   * @param data Full personal info data
   */
  async fillFullPersonalInfo(data: FullPersonalInfo) {
    await expect(this.page).toHaveURL(urlData.fullPersonalInfo)
    await this.fillYourName(data.namePart)
    await this.fillContactInformation(data.contactInfo)
    await this.fillAdditionalInformation(data.additionalInfo)
    await this.footer.continueButton.click()
    await this.modal.noButton.click()
  }
}
