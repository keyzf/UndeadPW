import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10159_[POS_Application]_PreQual_General_Questions_Budget_Navigation[PurchaseSearching]`, 
    {tag: ['@smoke', '@apply', '@purchase']},
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step(`STEP 1 - Go to Budget Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
        await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
        await expect(page).toHaveURL(urlData.budget)
      })

      await test.step(`STEP 2 - Enter valid value into Amount field`, async () => {
        await steps.budget.enterAmount(flowData.propertyValue)
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on Budget step.
        Click "Go Back" button`, async () => {
        await steps.currentCreditProfile.footer.goBackButton.click()
        await steps.budget.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.purchaseLocation)
      })
    })
})
