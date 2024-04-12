import {cardData, refinanceFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`14615_[POS_Application]_Personal_Information_NoCoborrower_Navigation_OnlyRequiredFields[Refinance]`, 
    {tag: ['@smoke', '@apply', '@refinance']}, async ({steps, loginModal, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
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
      await steps.rateComparison.chooseRateComparison()

      await test.step(`STEP 1 - Enter valid data only into required fields`, async () => {
        await steps.fullPersonalInfo.fillFullPersonalInfo(refinanceFlowData.fullPersonalInfo)
        await expect(page).toHaveURL(urlData.propertyInformation)
      })
    })
})
