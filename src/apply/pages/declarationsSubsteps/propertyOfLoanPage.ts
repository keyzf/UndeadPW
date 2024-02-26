import {Page} from '@playwright/test'

import {DropdownFragment, InputFragment, RadioButtonFragment} from '../../fragments'

export class PropertyOfLoanPage {
  readonly occupyPropertyRadiobutton: RadioButtonFragment
  readonly ownershipInterestRadiobutton: RadioButtonFragment
  readonly borrowingMoneyRadiobutton: RadioButtonFragment
  readonly applyingMortgageLoanRadiobutton: RadioButtonFragment
  readonly applyingNewCreditRadiobutton: RadioButtonFragment
  readonly subjectLienRadiobutton: RadioButtonFragment
  readonly typeOfPropertyDropdown: DropdownFragment
  readonly holdTitleDropdown: DropdownFragment
  readonly amountInput: InputFragment

  constructor(page: Page) {
    this.occupyPropertyRadiobutton =
      new RadioButtonFragment(page, '[data-testid="intendToOccupyPropertyAsPrimaryResidenceRadioGroup__component"]')
    this.ownershipInterestRadiobutton =
      new RadioButtonFragment(page, '[data-testid="ownershipInterestPastThreeYearsRadioGroup__component"]')
    this.borrowingMoneyRadiobutton =
      new RadioButtonFragment(page, '[data-testid="partOfDownPaymentBorrowedRadioGroup__component"]')
    this.applyingMortgageLoanRadiobutton =
      new RadioButtonFragment(page, '[data-testid="loanOnAnotherPropertyRadioGroup__component"]')
    this.applyingNewCreditRadiobutton =
      new RadioButtonFragment(page, '[data-testid="anyNewCreditOutsideOfTheLoanRadioGroup__component"]')
    this. subjectLienRadiobutton = new RadioButtonFragment(page, '[data-testid="isPropertyLienRadioGroup__component"]')

    // TODO: need to rewrite selectors
    this.typeOfPropertyDropdown =
      new DropdownFragment(page, page.locator('.css-1t32ceq-control').first())
    this.holdTitleDropdown =
      new DropdownFragment(page, page.locator('div').filter({hasText: /^Select\.\.\.$/}).nth(1))
    this.amountInput = new InputFragment(page, '[name="partOfDownPaymentBorrowedAmount"]')
  }
}
