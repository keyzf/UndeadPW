import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @purchaseSearching 10873_CurrentCreditProfile_Navigation[PurchaseSignedContract]`, 
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.ALREADY_SIGNED_A_PURCHASE_CONTRACT)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.purchasePrice.enterPurchasePrice(flowData.purchasePrice)

      await test.step(`STEP 2 - Verify that user can return to the previous step by clicking "Go Back" button`, 
        async () => {
          await steps.currentCreditProfile.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.purchasePrice)
        })

      await test.step('STEP 3 - Select Any card', async () => {
        await steps.purchasePrice.footer.continueButton.click()
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await expect(page).toHaveURL(urlData.downPayment)
      })
    })
})
