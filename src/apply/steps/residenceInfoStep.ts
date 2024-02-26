import {Page, expect} from '@playwright/test'

import {ResidenceInfo} from '../interfaces'
import {ResidenceInfoPage} from '../pages'

import {BasicStep} from './basicStep'
import {urlData} from 'data/apply'

export class ResidenceInfoStep extends BasicStep {
  readonly residenceInfo: ResidenceInfoPage

  constructor(page: Page) {
    super(page)
    this.residenceInfo = new ResidenceInfoPage(page)
  }

  async fillResidenceInfo(data: ResidenceInfo) {
    await expect(this.page).toHaveURL(urlData.residenceInfo)
    await this.residenceInfo.steerAddress.enterAddress({address: data.streetAddress})
    await this.residenceInfo.startDateInput.enterValue(data.startDate)
    await this.residenceInfo.residenceInfoTypeDropdown.selectValue(data.residenceType)
    await this.residenceInfo.doYourPayRentRadiobutton.selectValue(data.doYourPayRent)
    if(data.doYourPayRent === 'Yes') {
      await this.residenceInfo.payEachMonthInput.enterValue(data.payEachMonthInput as string)
    }
    await this.footer.continueButton.click()
  }
}
