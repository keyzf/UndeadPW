import {Page} from '@playwright/test'

import {AddressFragment, ButtonFragment, DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'

export class ReoPage {
  readonly reoCheckbox: RadioButtonFragment
  readonly typeOfPropertyDropdown: DropdownFragment
  readonly streetAddress: AddressFragment

  // Remaining Property
  readonly remainingPropertyRadiobutton: RadioButtonFragment
  readonly amountOwnedInput: InputFragment
  readonly amountOfPaymentInput: InputFragment

  // Taxes, Insurance block
  readonly escrowingRadiobutton: RadioButtonFragment
  readonly propertyInput: InputFragment
  readonly homeownersInsuranceInput: InputFragment

  // Association Fee
  readonly associationFeeRadiobutton: RadioButtonFragment
  readonly monthlyAssociationFeeAmountInput: InputFragment
  readonly associationNameInput: InputFragment
  readonly associationEmailInput: InputFragment
  readonly associationPhoneNumberInput: InputFragment

  // Other Expenses
  readonly otherExpensesRadiobutton: RadioButtonFragment

  readonly currentMarketValueInput: InputFragment
  readonly propertyStatusDropdown: DropdownFragment
  readonly removeButton: ButtonFragment
  readonly occupancyDropdown: DropdownFragment

  constructor(page: Page) {
    this.reoCheckbox = new RadioButtonFragment(page, '[data-testid="hasPropertiesRadioGroup__component"]')

    // Property you own block
    this.typeOfPropertyDropdown = new DropdownFragment(page, '[id*=".propertyType"]')

    // Property address block
    this.streetAddress = new AddressFragment(page)

    // Remaining on the property
    this.remainingPropertyRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".hasMortgageLoansRadioGroup__component"]')
    this.amountOwnedInput = new InputFragment(page, '[name*=".unpaidBalance"]')
    this.amountOfPaymentInput = new InputFragment(page, '[name*=".monthlyMortgagePayment"]')

    // Taxes, Insurance
    this.escrowingRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".taxesInsuranceEscrowedRadioGroup__component"]')
    this.propertyInput = new InputFragment(page, '[name*=".annualPropertyTaxes"]')
    this.homeownersInsuranceInput = new InputFragment(page, '[name*=".annualHomeownersInsurance"]')

    // Association Fee
    this.associationFeeRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".associationFeesRadioGroup__component"]')
    this.monthlyAssociationFeeAmountInput = new InputFragment(page, '[name*=".associationFeesAmount"]')
    this.associationNameInput = new InputFragment(page, '[name*=".associationFeesName"]')
    this.associationEmailInput = new InputFragment(page, '[name*=".associationFeesEmail"]')
    this.associationPhoneNumberInput = new InputFragment(page, '[name*=".associationFeesPhoneNumber"]')

    // Other Expenses
    this.otherExpensesRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".hasOtherExpensesRadioGroup__component"]')

    this.currentMarketValueInput = new InputFragment(page, '[name*=".propertyValue"]')
    this.propertyStatusDropdown = new DropdownFragment(page, '[id*=".status"]')
    this.occupancyDropdown = new DropdownFragment(page, '[id*=".occupancy"]')

    this.removeButton = new ButtonFragment(page, '[aria-label="delete property"]')
  }
}
