import {cardData, refinanceFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`13961_[POS_Application]_PreQual_Submitting_Conventional->RateComparison->Conventional_Navigation[Refinance]`, 
    {tag: ['@smoke', '@apply', '@refinance']}, async ({steps, loginModal, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)

      await test.step(`STEP 1 - Go to Rate Comparison Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
        await steps.propertyAddress.enterAddress(refinanceFlowData.street)
        await steps.propertyValue.enterPropertyValue(refinanceFlowData.propertyValue)
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(refinanceFlowData.currentMortgageBalance)
        await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await steps.personalInfo.fillPersonalInfoStep(refinanceFlowData.personalInfo)
        await loginModal.geVerificationCode()
        await expect(page).toHaveURL(urlData.rateComparison)
      })

      await test.step(`STEP 2 - Select Any program`, async () => {
        await steps.rateComparison.chooseRateComparison()
        await expect(page).toHaveURL(urlData.fullPersonalInfo)
      })
    })
})
