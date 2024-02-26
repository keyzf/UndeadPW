import {Page} from '@playwright/test'
import {CheckboxFragment, InputFragment, RadioButtonFragment} from 'src/apply/fragments'

export class DemographicInformationPage {
  readonly ethnicityRadioButton: RadioButtonFragment
  readonly ethnicityCheckboxes: CheckboxFragment
  readonly sexRadioButton: RadioButtonFragment
  readonly raceCheckboxes: CheckboxFragment
  readonly tribeInput: InputFragment
  readonly raceAsianCheckboxes: CheckboxFragment
  readonly pacificIslanderCheckboxes: CheckboxFragment

  constructor(page: Page) {
    this.ethnicityRadioButton = new RadioButtonFragment(page, page.getByText('Hispanic or LatinoNot'))
    this.ethnicityCheckboxes = new CheckboxFragment(page, page.locator('[//input[@name="isMexican"]/ancestor::div[1]]'))
    this.sexRadioButton = new RadioButtonFragment(page, '[data-testid="sexRadioGroup__component"]')
    this.raceCheckboxes =
      new CheckboxFragment(page, page.locator('//*[@id="DemographicInformation"]/div/div[4]'))

    this.tribeInput = new InputFragment(page, '[name="americanTribeName"]')
    this.raceAsianCheckboxes =
      new CheckboxFragment(page, page.locator('[//input[@name="isAsianIndian"]/ancestor::div[1]]'))
    this.pacificIslanderCheckboxes =
      new CheckboxFragment(page, page.locator('[//input[@name="isNativeHawaiian"]/ancestor::div[1]]'))
  }
}
