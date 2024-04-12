import {cardData, refinanceFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10161_[POS_Application]_PreQual_General_Questions_PropertyValue_Navigation[Refinance]`, 
    {tag: ['@smoke', '@apply', '@refinance']}, async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step(`STEP 1 - Go to Property Value Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await steps.propertyAddress.enterAddress(refinanceFlowData.street)
        await expect(page).toHaveURL(urlData.propertyValue)
      })

      await test.step(`STEP 2 - Enter valid value into Amount field`, async () => {
        await steps.propertyValue.enterPropertyValue(refinanceFlowData.propertyValue)
        await expect(page).toHaveURL(urlData.currentMortgageBalance)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on Property Value step`, async () => {
        await steps.currentMortgageBalance.footer.goBackButton.click()
        await steps.propertyValue.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.propertyAddress)
      })
    })
})
