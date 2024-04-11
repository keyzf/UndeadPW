import {cardData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10144_PurchaseLocation_LicensedStatesVerification[PurchaseSearching]`, {tag: ['@P3', '@apply', '@purchase']},
    async ({steps}) => {
      const unprovidedZip = '99336'
      const errorText = `Unfortunately, we don't provide service in your state at this time.`

      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step(`STEP 1 - Go to Purchase Location Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)

        await steps.purchaseLocation.enterAddress(unprovidedZip)
        await expect(await steps.purchaseLocation.errorText.getData()).toEqual(errorText)
      })
    })
})
