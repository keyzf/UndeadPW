import {Page} from '@playwright/test'
import {ButtonFragment, InputFragment, RadioButtonFragment} from 'src/apply/fragments'

export class HomeownershipEducationHousingCounselingPage {
  readonly homeownershipEducationRadiobutton: RadioButtonFragment
  readonly housingCounselingRadiobutton: RadioButtonFragment
  readonly formatEducationRadiobutton: RadioButtonFragment
  readonly formatHousingCounselingRadiobutton: RadioButtonFragment
  readonly addAgencyButton: ButtonFragment
  readonly programInput: InputFragment
  readonly dateOfCompletionInput: InputFragment

  constructor(page: Page) {
    this.homeownershipEducationRadiobutton =
      new RadioButtonFragment(page, '[data-testid="isBorrowerCompletedHomeownershipEducationRadioGroup__component"]')
    this.formatEducationRadiobutton =
      new RadioButtonFragment(page, '[data-testid="borrowerHomeownershipEducationFormatRadioGroup__component"]')
    this.housingCounselingRadiobutton =
      new RadioButtonFragment(page, '[data-testid="isBorrowerCompletedHousingCounselingRadioGroup__component"]')
    this.formatHousingCounselingRadiobutton =
      new RadioButtonFragment(page, '[data-testid="borrowerHousingCounselingFormatRadioGroup__component"]')
    this.addAgencyButton = new ButtonFragment(page, 'button[type="button"]')
    this.programInput = new InputFragment(page, '[name="homeownershipEducationNameOfTheHousingEducationProgram"]')
    this.dateOfCompletionInput = new InputFragment(page, '[name="dateOfCompletionHomeownershipEducation"]')
  }
}
