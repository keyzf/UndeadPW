import {cardData, flowData} from '../../data/apply';
import {LoginModalFragment} from '../../src/apply/fragments';
import {Steps} from '../../src/apply/po'
import {test, expect} from '@playwright/test';
import ENV from '../../data/envs/env';

test('Apply Test', async ({page}) => {
  const steps = new Steps(page);
  const loginModal = new LoginModalFragment(page);

  await steps.typeOfLoan.openApply('https://qa-apply.cyberdynemortgage.com');
  await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE);
  await steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME);
  await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME);
  await steps.propertyAddress.enterAddress(flowData.street);
  await steps.propertyValue.enterPropertyValue(flowData.propertyValue);
  await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance);
  await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT);
  await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR);
  await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo);
  await loginModal.geVerificationCode();
  await steps.rateComparison.chooseRateComparison();
})
