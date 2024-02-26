import {BasicStep} from '../basicStep'
import {DemographicInformationPage} from 'src/apply/pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export type TDemographic = {
  ethnicity: string,
  subEthnicity?: TSubEthnicity,
  sex: string,
  race: TRace
}

type TSubEthnicity = {
  subEthnicity: string
}

type TRace = {
  name: string,
  subrace?: string,
  nameTribe?: string
}

export class DemographicInformationSubstep extends BasicStep {
  readonly demographicInfoPage: DemographicInformationPage
  private notProvideInfo = 'I do not wish to provide this information'

  constructor(page: Page) {
    super(page)
    this.demographicInfoPage = new DemographicInformationPage(page)
  }

  private async fillEthnicity(value: string, subValue?: TSubEthnicity) {
    await this.demographicInfoPage.ethnicityRadioButton.selectValue(value)
    if(value === 'Hispanic or Latino') {
      await this.demographicInfoPage.ethnicityCheckboxes.check(subValue?.subEthnicity)
    }
  }

  private async fillSex(value: string) {
    await this.demographicInfoPage.sexRadioButton.selectValue(value)
  }

  private async fillRace(data: TRace) {
    await this.demographicInfoPage.raceCheckboxes.check(data.name)
    switch (data.name) {
      case 'American Indian or Alaska Native': {
        await this.demographicInfoPage.tribeInput.enterValue(data.nameTribe as string)
        break
      }
      case 'Native Hawaiian or Other Pacific Islander': {
        await this.demographicInfoPage.pacificIslanderCheckboxes.check(data.subrace)
        break
      }
      case 'Black or African American': {
        break
      }
      case 'White': {
        break
      }
      case 'I do not wish to provide': {
        break
      }
    }
  }

  public async fillDemographic(value?: TDemographic) {
    await expect(this.page).toHaveURL(urlData.demographicInformation)
    if(value) {
      await this.fillEthnicity(value.ethnicity, value.subEthnicity)
      await this.fillSex(value.sex)
      await this.fillRace(value.race)
      await this.footer.continueButton.click()
    }
    await this.demographicInfoPage.ethnicityRadioButton.selectValue(this.notProvideInfo)
    await this.demographicInfoPage.sexRadioButton.selectValue(this.notProvideInfo)
    await this.demographicInfoPage.raceCheckboxes.check(this.notProvideInfo)
    await this.footer.continueButton.click()
  }
}
