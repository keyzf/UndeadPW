import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10160_PurchasePrice_Navigation[PurchaseSignedContract]`, {tag: ['@P1', '@apply', '@purchase']},
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.ALREADY_SIGNED_A_PURCHASE_CONTRACT)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await expect(page).toHaveURL(urlData.purchasePrice)

      await test.step(`STEP 1 - Verify that user can return to the previous step by clicking "Go Back" button`, 
        async () => {
          await steps.purchasePrice.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.propertyAddress)
        })

      await test.step(`STEP 2 - Verify that user is able to proceed to the next step by entering a valid 
        value to "Amount" field and clicking "Continue" button`, 
      async () => {
        await steps.propertyAddress.footer.continueButton.click()
        await steps.purchasePrice.enterPurchasePrice(flowData.propertyValue)
        await expect(page).toHaveURL(urlData.currentCreditProfile)
      })
    })
})
