import {cardData, purchaseFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`20977_[POS_Application]_PreQual_Realtors_RealtorInLoop_Navigation[PurchaseSearching]`, 
    {tag: ['@smoke', '@apply', '@purchase']}, async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)

      await test.step(`STEP 1 - Go to Realtor In Loop Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await steps.purchaseLocation.enterAddress(purchaseFlowData.purchaseAddress.zipCode)
        await steps.budget.enterAmount(purchaseFlowData.propertyValue)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await steps.downPayment.enterAmount(purchaseFlowData.downPayment)
        await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.YES)
        await expect(page).toHaveURL(urlData.realtorInLoop)
      })

      await test.step(`STEP 2 - Select "No" card`, async () => {
        await steps.realtorInLoop.selectRealtorInLoop(cardData.realtorInLoop.NO)
        await expect(page).toHaveURL(urlData.personalInfo)
      })

      await test.step(`STEP 3 - Select "Yes" card`, async () => {
        await steps.personalInfo.footer.goBackButton.click()
        await steps.realtorInLoop.selectRealtorInLoop(cardData.realtorInLoop.YES)
        await expect(page).toHaveURL(urlData.realtorInfo)
      })

      await test.step(`STEP 4 - Select "Yes" card`, async () => {
        await steps.realtorInLoop.footer.goBackButton.click()
        await steps.realtorInLoop.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.workingWithRealtors)
      })
    })
})
