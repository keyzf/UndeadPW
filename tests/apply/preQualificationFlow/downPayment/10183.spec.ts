import {cardData, purchaseFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10183_DownPayment_SelectProposedValue_Navigation[PurchaseSearching]`, 
    {tag: ['@P1', '@apply', '@purchase']}, async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
      await steps.purchaseLocation.enterAddress(purchaseFlowData.purchaseAddress.zipCode)
      await steps.budget.enterAmount(purchaseFlowData.propertyValue)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      await expect(page).toHaveURL(urlData.downPayment)

      await test.step(`STEP 1 - Verify that user can return to the previous step by clicking "Go Back" button`, 
        async () => {
          await steps.downPayment.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.currentCreditProfile)
          await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        })

      await test.step(`STEP 2 - Select one of the proposed cards for a down payment`, async () => {
        await steps.downPayment.cards.cardType.getByText('$60,000').click()
        await expect(steps.downPayment.cards.checkMark.nth(1).locator('svg')).toBeVisible()
      })

      await test.step(`STEP 3 - Select one of the proposed cards with the certain Down payment percentage.
        Click Continue button`, async () => {
        await steps.downPayment.footer.continueButton.click()
        await expect(page).toHaveURL(urlData.workingWithRealtors)
      })
    })
})
