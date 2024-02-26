import {Page} from '@playwright/test'

import {CheckboxFragment, RadioButtonFragment} from '../../fragments'

export class FinancesPage {
  readonly coSignerRadiobutton: RadioButtonFragment
  readonly outstandingJudgmentsRadiobutton: RadioButtonFragment
  readonly federalDebtRadiobutton: RadioButtonFragment
  readonly partyLawsuitRadiobutton: RadioButtonFragment
  readonly conveyedPropertyRadiobutton: RadioButtonFragment
  readonly preForeclosureRadiobutton: RadioButtonFragment
  readonly propertyForeclosedRadiobutton: RadioButtonFragment
  readonly bankruptcyRadiobutton: RadioButtonFragment
  readonly bankruptcyTypeCheckbox: CheckboxFragment

  constructor(page: Page) {
    this.coSignerRadiobutton =
      new RadioButtonFragment(page, '[data-testid="guarantorOnAnyDebtOutsideTheLoanRadioGroup__component"]')
    this.outstandingJudgmentsRadiobutton =
      new RadioButtonFragment(page, '[data-testid="outstandingJudgementsRadioGroup__component"]')
    this.federalDebtRadiobutton =
      new RadioButtonFragment(page, '[data-testid="presentlyObligatedOnAnyLoanOrDebtRadioGroup__component"]')
    this.partyLawsuitRadiobutton =
      new RadioButtonFragment(page, '[data-testid="partyToLawSuiteRadioGroup__component"]')
    this.conveyedPropertyRadiobutton =
      new RadioButtonFragment(page, '[data-testid="propertyInLieuOfForeclosureInPastSevenYearsRadioGroup__component"]')
    this.preForeclosureRadiobutton =
      new RadioButtonFragment(page, '[data-testid*="foreclosureSoldLessOutstandingBalanceWithinPastSevenYears"]')
    this.propertyForeclosedRadiobutton =
      new RadioButtonFragment(page, '[data-testid="isLastMonthsForeclosureRadioGroup__component"]')
    this.bankruptcyRadiobutton =
      new RadioButtonFragment(page, '[data-testid="isLastMonthsBankruptcyRadioGroup__component"]')
    this.bankruptcyTypeCheckbox = new CheckboxFragment(page, '[data-testid="bankruptTypesCheckboxGroup__component"]')
  }
}
