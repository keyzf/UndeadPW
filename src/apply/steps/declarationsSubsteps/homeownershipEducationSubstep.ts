import {BasicStep} from '../basicStep'
import {DeclarationsValues} from '.'
import {Education, HomeownershipEducationHousingCounseling, HousingCounseling} from 'src/apply/interfaces'
import {FooterFragment} from 'src/apply/fragments'
import {HomeownershipEducationHousingCounselingPage} from 'src/apply/pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class HomeownershipEducationHousingCounselingSubstep extends BasicStep {
  readonly homeownershipEducationHousingCounseling: HomeownershipEducationHousingCounselingPage
  readonly footer: FooterFragment

  constructor(page: Page) {
    super(page)
    this.homeownershipEducationHousingCounseling = new HomeownershipEducationHousingCounselingPage(page)
    this.footer = new FooterFragment(page)
  }

  private async fillEducations(data: Education) {
    await this.homeownershipEducationHousingCounseling
      .formatEducationRadiobutton.selectValue(data.format as string)
    await this.homeownershipEducationHousingCounseling
      .programInput.enterValue(data.hudApproval?.program as string)
    await this.homeownershipEducationHousingCounseling.dateOfCompletionInput
      .enterValue(data.hudApproval?.dateOfCompletion as string)
  }

  private async fillHousingCounseling(data: HousingCounseling) {
    await this.homeownershipEducationHousingCounseling.formatHousingCounselingRadiobutton
      .selectValue(data.format as string)
    await this.homeownershipEducationHousingCounseling.programInput
      .enterValue(data.hudApproval?.program as string)
    await this.homeownershipEducationHousingCounseling.dateOfCompletionInput
      .enterValue(data.hudApproval?.dateOfCompletion as string)
  }

  public async fillHomeownershipEducationHousingCounseling(data: DeclarationsValues, values?:
    HomeownershipEducationHousingCounseling) {
    await expect(this.page).toHaveURL(urlData.homeownership)
    if(data === DeclarationsValues.no) {
      await this.homeownershipEducationHousingCounseling.homeownershipEducationRadiobutton.selectNo()
      await this.homeownershipEducationHousingCounseling.housingCounselingRadiobutton.selectNo()
      await this.footer.continueButton.click()
    } else if(data === DeclarationsValues.yes) {
      await this.homeownershipEducationHousingCounseling.homeownershipEducationRadiobutton.selectYes()
      await this.fillEducations(values?.education as Education)
      await this.homeownershipEducationHousingCounseling.housingCounselingRadiobutton.selectYes()
      await this.fillHousingCounseling(values?.housingCounseling as HousingCounseling)
      await this.footer.continueButton.click()
    }
  }
}
