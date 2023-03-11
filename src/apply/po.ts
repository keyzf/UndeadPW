import {Page} from '@playwright/test';
import * as steps from './steps';


export class Steps {
  typeOfLoan: steps.TypeOfLoanStep;
  propertyType: steps.PropertyTypeStep;
  propertyUsageDetails: steps.PropertyUsageDetailsStep;
  propertyAddress: steps.PropertyAddressStep;
  propertyValue: steps.PropertyValueStep;
  currentMortgageBalance: steps.CurrentMortgageBalanceStep;
  purposeOfRefinance: steps.PurposeOfRefinanceStep;
  currentCreditProfile: steps.CurrentCreditProfileStep;

  constructor(page: Page) {
    this.typeOfLoan = new steps.TypeOfLoanStep(page);
    this.propertyType = new steps.PropertyTypeStep(page);
    this.propertyUsageDetails = new steps.PropertyUsageDetailsStep(page);
    this.propertyAddress = new steps.PropertyAddressStep(page);
    this.propertyValue = new steps.PropertyValueStep(page);
    this.currentMortgageBalance = new steps.CurrentMortgageBalanceStep(page);
    this.purposeOfRefinance = new steps.PurposeOfRefinanceStep(page);
    this.currentCreditProfile = new steps.CurrentCreditProfileStep(page);
  }
}