import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @purchaseSearching 10191_[Accounts]_POS_Auth_PersonalInfo_SignIn_ViaPhone[WithoutFlow]`, 
    async ({steps, loginModal, page}) => {
      await test.step(`STEP 1 - Go to Personal Info Step`, async () => {
        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
        await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
        await steps.budget.enterAmount(flowData.propertyValue)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await steps.downPayment.enterAmount(flowData.downPayment)
        await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
        await expect(page).toHaveURL(urlData.personalInfo)
      })

      await test.step(`STEP 2 - Fill Personal Info step`, async () => {
        await 
        await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
        await loginModal.geVerificationCode()
        await expect(page).toHaveURL(urlData.rateComparison)
      })
    })
})
