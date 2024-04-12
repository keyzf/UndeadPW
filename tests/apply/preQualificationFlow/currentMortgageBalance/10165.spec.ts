import {cardData, purchaseFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10165_[POS_Application]_PreQual_General_Questions_CurrentMortgageBalance_Navigation[Refinance]`, 
    {tag: ['@P1', '@apply', '@purchase']}, async ({steps, page}) => {
      await test.step(`STEP 1 - Go to Current Mortgage Balance step`, async () => {
        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
        await steps.propertyAddress.enterAddress(purchaseFlowData.street)
        await steps.propertyValue.enterPropertyValue(purchaseFlowData.propertyValue)
        await expect(page).toHaveURL(urlData.currentMortgageBalance)
      })

      await test.step('STEP 2 - Enter more than 1 into "Amount" field', async () => {
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(purchaseFlowData.currentMortgageBalance)
        await expect(page).toHaveURL(urlData.purposeOfRefinance)
      })

      await test.step('STEP 3 - Click "Go Back" button', async () => {
        await steps.purposeOfRefinance.footer.goBackButton.click()
        await steps.currentMortgageBalance.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.propertyValue)
      })
    })
})
