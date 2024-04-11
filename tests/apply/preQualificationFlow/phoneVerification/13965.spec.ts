import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`13965_PhoneVerification_NoPrograms_NotLoggedUser[PurchaseSearching]`, 
    {tag: ['@P2', '@apply', '@purchase']}, async ({steps, loginModal, page}) => {
      const testData = {
        budget: '300000',
        downPayment: '30000',
        errorText: `Your loan scenario qualifies for the expertise of our dedicated loan experts`
      }

      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
      await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
      await steps.budget.enterAmount(testData.budget)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.BAD)
      await steps.downPayment.enterAmount(testData.downPayment)
      await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
      await expect(page).toHaveURL(urlData.personalInfo)
  
      await test.step(`STEP 1 - Go to Personal Info step`, async () => {
        await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
        await loginModal.geVerificationCode()
        await steps.rateComparison.rateComparisonErrorElement.getLocator().waitFor({state: 'visible'})
        expect(await steps.rateComparison.rateComparisonErrorElement.getData()).toContain(testData.errorText)
      })
    })
})
