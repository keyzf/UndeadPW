import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('@P1 @apply @purchase 10635_PropertyUsageDetails_Navigation[PurchaseSignedContract]',
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step('STEP 1 - [Purchase Signed Contract]. Click "Go Back" button', async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.NO)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await expect(page).toHaveURL(urlData.propertyUsageDetails)
        await steps.propertyUsageDetails.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.propertyType)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      })

      await test.step(`STEP 2 - Verify that user is able to proceed to the next step by
        clicking one of the following cards`, async () => {
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await expect(page).toHaveURL(urlData.purchaseLocation)
      })
    })
})
