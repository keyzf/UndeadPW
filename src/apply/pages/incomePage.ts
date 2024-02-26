import {Page} from '@playwright/test'

import {AddressFragment, CheckboxFragment, DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'

export class IncomePage {
  readonly incomeRadiobutton: RadioButtonFragment
  readonly incomeTypeDropdown: DropdownFragment
  readonly startDateInput: InputFragment
  readonly endDateInput: InputFragment
  readonly monthlyIncomeInput: InputFragment

  readonly currentlyEmployedRadiobutton: RadioButtonFragment
  readonly businessNameInput: InputFragment
  readonly jobTitleInput: InputFragment
  readonly monthlyCompensationInput: InputFragment
  readonly yearsProfessionInput: InputFragment
  readonly monthsProfessionInput: InputFragment
  readonly familyMemberCheckbox: CheckboxFragment

  readonly ownershipInterestCheckbox: CheckboxFragment
  readonly businessAddress: AddressFragment
  readonly phoneNumberInput: InputFragment

  readonly receiveBonusCheckbox: RadioButtonFragment

  constructor(page: Page) {
    this.incomeRadiobutton = new RadioButtonFragment(page, '[data-testid="hasIncomesRadioGroup__component"]')
    this.incomeTypeDropdown = new DropdownFragment(page, '[id*=".incomeType"]')

    this.startDateInput = new InputFragment(page, '[name*=".startDate"]')
    this.endDateInput = new InputFragment(page, '[name*=".endDate"]')
    this.monthlyIncomeInput = new InputFragment(page, '[name*=".monthlyIncome"]')

    this.currentlyEmployedRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".isCurrentlyEmployedHereRadioGroup__component"]')
    this.businessNameInput = new InputFragment(page, '[name*=".employerName"]')

    this.jobTitleInput = new InputFragment(page, '[name*=".positionOrTitle"]')
    this.monthlyCompensationInput = new InputFragment(page, '[name*=".grossMonthlyBaseSalary"]')
    this.yearsProfessionInput = new InputFragment(page, '[name*=".yearsInProfession"]')
    this.monthsProfessionInput = new InputFragment(page, '[name*=".monthsInProfession"]')
    this.familyMemberCheckbox = new CheckboxFragment(page, '')

    this.ownershipInterestCheckbox = new CheckboxFragment(page, '')
    this.businessAddress = new AddressFragment(page)
    this.phoneNumberInput = new InputFragment(page, '[name*=".workPhoneNumber"]')

    this.receiveBonusCheckbox = new RadioButtonFragment(page, '[data-testid*=".isBonusReceivedRadioGroup__component"]')
  }
}
