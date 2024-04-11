import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`8227_[POS_Application]_PreQual_General_Questions_PurchaseProcessType_Navigation[PurchaseSearching]`, 
    {tag: ['@P1', '@apply', '@purchase']}, async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)

      await test.step(`STEP 1 - Go to Purchase Process Type Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await expect(page).toHaveURL(urlData.purchaseProcessType)
      })

      await test.step(`STEP 2 - Select Card on step`, async () => {
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await expect(page).toHaveURL(urlData.propertyType)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on Purchase Process Type step. 
        Click "Go Back" button`, 
      async () => {
        await steps.propertyType.footer.goBackButton.click()
        await steps.purchaseProcessType.footer.goBackButton.click()
        await steps.firstTimeBuyer.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.typeOfLoan)
      })
    })
})
