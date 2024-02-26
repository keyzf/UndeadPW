import {Page} from '@playwright/test'
import {CheckboxFragment, RadioButtonFragment} from 'src/apply/fragments'

export class MilitaryServicesPage {
  readonly currentlyServingRadiobutton: RadioButtonFragment
  readonly servingActiveDutyCheckbox: CheckboxFragment
  readonly retiredCheckbox: CheckboxFragment
  readonly nonActivatedMemberCheckbox: CheckboxFragment
  readonly survivingSpouseCheckbox: CheckboxFragment

  constructor(page: Page) {
    this.currentlyServingRadiobutton =
      new RadioButtonFragment(page, '[data-testid="isServedInMilitaryRadioGroup__component"]')

    this.servingActiveDutyCheckbox = new CheckboxFragment(page, '[name="isCurrentlyServing"]')
    this.retiredCheckbox = new CheckboxFragment(page, '[name="isCurrentlyRetired"]')
    this.nonActivatedMemberCheckbox = new CheckboxFragment(page, '[name="isNonActivatedMemberOfReserveNationalGuard"]')
    this.survivingSpouseCheckbox = new CheckboxFragment(page, '[name="isSurvivingSpouse"]')
  }
}
