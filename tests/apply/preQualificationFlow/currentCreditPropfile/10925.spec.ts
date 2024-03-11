import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @refinance 10925_CurrentCreditProfile_Navigation[RefinanceCashOut]`, 
    async ({steps, page}) => {
      await test.step(`STEP 1 - Go to Current Profile step`, async () => {
        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
        await steps.propertyAddress.enterAddress(flowData.street)
        await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
        await steps.purposeOfRefinance
          .selectPurposeOfRefinance(cardData.purposeOfRefinance.TAKE_CASH_OUT_OF_YOUR_HOME)
        await steps.cashOutAmount.enterAmount(flowData.cashOutAmount)
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })

      await test.step('STEP 2 - Verify that user can return to the previous step by clicking "Go Back" button', 
        async () => {
          await steps.currentCreditProfile.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.cashOutAmount)
        })

      await test.step('STEP 3 - Select Any card', async () => {
        await steps.cashOutAmount.footer.continueButton.click()
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await expect(page).toHaveURL(urlData.personalInfo)
      })
    })
})
