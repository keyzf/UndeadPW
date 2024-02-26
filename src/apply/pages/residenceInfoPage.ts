import {Page} from '@playwright/test'

import {AddressFragment, CheckboxFragment, DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'

export class ResidenceInfoPage {
  readonly isYourMailingAddressCheckbox: CheckboxFragment
  readonly residenceInfoTypeDropdown: DropdownFragment
  readonly startDateInput: InputFragment
  readonly steerAddress: AddressFragment
  readonly doYourPayRentRadiobutton: RadioButtonFragment
  readonly payEachMonthInput: InputFragment

  constructor(page: Page) {
    this.startDateInput = new InputFragment(page, '[data-testid="currentResidence__startOfResidencePicker"]')
    this.steerAddress = new AddressFragment(page)
    this.residenceInfoTypeDropdown = new DropdownFragment(page, '[id*=".housingType"]')
    this.isYourMailingAddressCheckbox = new CheckboxFragment(page, '')
    this.doYourPayRentRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".hasRelativesPartRentRadioGroup__component"]')
    this.payEachMonthInput =
      new InputFragment(page, '[data-testid="currentResidence__monthlyRelativesPartRentAmountInput"]')
  }
}
