import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`5451_Consolidate1st_2ndMortgage_Navigation[Refinance]`, {tag: ['@P2', '@apply', '@refinance']},
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await expect(page).toHaveURL(urlData.purposeOfRefinance)

      await test.step('STEP 1 - Go to Property Usage Details step', async () => {
        await steps.purposeOfRefinance
          .selectPurposeOfRefinance(cardData.purposeOfRefinance.CONSOLIDATE_YOUR_1ST_AND_2ND_MORTGAGE)
        await steps.purposeOfRefinance.modalFragment.yesButton.click()
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })

      await test.step('STEP 2 - Select Any Cards', async () => {
        await steps.currentCreditProfile.footer.goBackButton.click()
        await steps.purposeOfRefinance
          .selectPurposeOfRefinance(cardData.purposeOfRefinance.CONSOLIDATE_YOUR_1ST_AND_2ND_MORTGAGE)
        await steps.purposeOfRefinance.modalFragment.noButton.click()
        await expect(page).toHaveURL(urlData.cashOutAmount)
      })
    })
})
