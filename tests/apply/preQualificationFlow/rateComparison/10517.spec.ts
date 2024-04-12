import {cardData, purchaseFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10517_PreQual_Submitting_Conventional->RateComparison->Conventional_Navigation[PurchaseSearching]`, 
    {tag: ['@smoke', '@apply', '@purchase']}, async ({steps, loginModal, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)

      await test.step(`STEP 1 - Go to Rate Comparison Step`, async () => {
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
        await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
        await steps.personalInfo.fillPersonalInfoStep(purchaseFlowData.personalInfo)
        await loginModal.geVerificationCode()
        await expect(page).toHaveURL(urlData.rateComparison)
      })

      await test.step(`STEP 2 - Select Any program`, async () => {
        await steps.rateComparison.chooseRateComparison()
        await expect(page).toHaveURL(urlData.fullPersonalInfo)
      })
    })
})
