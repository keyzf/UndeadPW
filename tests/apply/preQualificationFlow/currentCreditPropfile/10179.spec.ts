import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @purchaseSearching 
    10179_[POS_Application]_PreQual_General_Questions_CurrentCreditProfile_Navigation[PurchaseSearching]`, 
  async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step('STEP 1 - Go to Current Credit Profile step', async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
      await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
      await steps.budget.enterAmount(flowData.propertyValue)
      await expect(page).toHaveURL(urlData.currentCreditProfile)
    })

    await test.step(`STEP 2 - Select Any Card`, async () => {
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      await expect(page).toHaveURL(urlData.downPayment)
    })

    await test.step('STEP 4 - Verify that "Continue" button is not displayed on the step', async () => {
      await steps.downPayment.footer.goBackButton.click()
      await steps.currentCreditProfile.footer.goBackButton.click()
      await expect(page).toHaveURL(urlData.budget)
    })
  })
})
