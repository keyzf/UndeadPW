import {test, expect} from '@playwright/test';
import {cardData} from '../../data/apply';
import {Steps} from '../../src/apply/po'
import ENV from '../../data/envs/env';

test('Apply Test', async ({ page }) => {
    const steps = new Steps(page);

    //TODO: Uncomment if need run tests from extensions test runner
    //await page.goto('https://qa-apply.cyberdynemortgage.com');
    await steps.typeOfLoan.openApply(ENV.APPLY_URL);
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE);
    await steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME);
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME);
    await steps.propertyAddress.enterAddress('950 22nd St N Birmingham, AL, USA');
    await steps.propertyValue.enterPropertyValue('600,000');
    await steps.currentMortgageBalance.enterCurrentMortgageBalance('400,000');
    await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT);
    await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR);

    await expect(page).toHaveURL(/.*personal-info/);
})
