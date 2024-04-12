import {DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'
import {Page} from '@playwright/test'

export class PropertyInformationPage {
  // Property Details block
  readonly yearBuiltInput: InputFragment
  readonly typeOfPropertyDropdown: DropdownFragment
  readonly attachmentTypeDropdown: DropdownFragment
  readonly propertyStatus: DropdownFragment
  readonly numberOfUnitsDropdown: DropdownFragment

  // Taxes, Insurance block
  readonly escrowingRadiobutton: RadioButtonFragment
  readonly annualPropertyInput: InputFragment
  readonly homeownersInsuranceInput: InputFragment

  // Homeowner's Association block
  readonly homeownerAssociationRadiobutton: RadioButtonFragment

  // Other Expenses
  readonly otherExpensesRadiobutton: RadioButtonFragment

  // Rental Income
  readonly rentalIncomeRadiobutton: RadioButtonFragment

  // Mortgage remaining on the property
  readonly remainingPropertyRadiobutton: RadioButtonFragment
  readonly amountOwnedInput: InputFragment
  readonly amountPaymentInput: InputFragment

  constructor(page: Page) {
    this.yearBuiltInput = new InputFragment(page, '[name="yearBuilt"]')
    this.typeOfPropertyDropdown = new DropdownFragment(page, '[id^="propertyType"]')
    this.attachmentTypeDropdown = new DropdownFragment(page, '[id^="attachmentType"]')
    this.numberOfUnitsDropdown = new DropdownFragment(page, '[id^="numberOfUnits"]')
    // TODO: need to add selector
    this.propertyStatus = new DropdownFragment(page, '')
    //
    this.escrowingRadiobutton =
      new RadioButtonFragment(page, '[data-testid="taxesInsuranceEscrowedRadioGroup__component"]')
    this.annualPropertyInput = new InputFragment(page, '[name="annualPropertyTaxes"]')
    this.homeownersInsuranceInput = new InputFragment(page, '[name="annualHomeownersInsurance"]')
    this.homeownerAssociationRadiobutton =
      new RadioButtonFragment(page, '[data-testid*="associationFeesRadioGroup__component"]')
    this.otherExpensesRadiobutton =
      new RadioButtonFragment(page, '[data-testid*="hasOtherExpensesRadioGroup__component"]')
    this.rentalIncomeRadiobutton = new RadioButtonFragment(page, '[data-testid="isRentalIncomeRadioGroup__component"]')
    this.remainingPropertyRadiobutton =
      new RadioButtonFragment(page, '[data-testid*=".hasMortgageLoansRadioGroup__component"]')
    this.amountOwnedInput = new InputFragment(page, '[name*=".unpaidBalance"]')
    this.amountPaymentInput = new InputFragment(page, '[name*=".monthlyMortgagePayment"]')
  }
}
