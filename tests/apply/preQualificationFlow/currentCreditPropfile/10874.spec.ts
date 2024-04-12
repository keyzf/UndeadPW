import {cardData, refinanceFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10874_[POS_Application]_PreQual_General_Questions_CurrentCreditProfile_Navigation[Refinance]`, 
    {tag: ['@P1', '@apply', '@refinance']},
    async ({steps, page}) => {
      await test.step(`STEP 1 - Go to Current Profile step`, async () => {
        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.TOWNHOUSE)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await steps.propertyAddress.enterAddress(refinanceFlowData.street)
        await steps.propertyValue.enterPropertyValue(refinanceFlowData.propertyValue)
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(refinanceFlowData.currentMortgageBalance)
        await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })

      await test.step('STEP 2 - Select Any card', async () => {
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await expect(page).toHaveURL(urlData.personalInfo)
      })

      await test.step('STEP 3 - Select Any card', async () => {
        await steps.personalInfo.footer.goBackButton.click()
        await steps.currentCreditProfile.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.purposeOfRefinance)
      })
    })
})
