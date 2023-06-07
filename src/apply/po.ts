import {Page} from '@playwright/test';
import * as steps from './steps';

export class Steps {
  currentCreditProfile: steps.CurrentCreditProfileStep;
  currentMortgageBalance: steps.CurrentMortgageBalanceStep;
  personalInfo: steps.PersonalInfoStep;
  propertyAddress: steps.PropertyAddressStep;
  propertyType: steps.PropertyTypeStep;
  propertyUsageDetails: steps.PropertyUsageDetailsStep;
  propertyValue: steps.PropertyValueStep;
  purposeOfRefinance: steps.PurposeOfRefinanceStep;
  rateComparison: steps.RateComparisonStep;
  typeOfLoan: steps.TypeOfLoanStep;

  constructor(page: Page) {
    this.currentCreditProfile = new steps.CurrentCreditProfileStep(page);
    this.currentMortgageBalance = new steps.CurrentMortgageBalanceStep(page);
    this.personalInfo = new steps.PersonalInfoStep(page);
    this.propertyAddress = new steps.PropertyAddressStep(page);
    this.propertyType = new steps.PropertyTypeStep(page);
    this.propertyUsageDetails = new steps.PropertyUsageDetailsStep(page);
    this.propertyValue = new steps.PropertyValueStep(page);
    this.purposeOfRefinance = new steps.PurposeOfRefinanceStep(page);
    this.rateComparison = new steps.RateComparisonStep(page);
    this.typeOfLoan = new steps.TypeOfLoanStep(page);
  }
}
