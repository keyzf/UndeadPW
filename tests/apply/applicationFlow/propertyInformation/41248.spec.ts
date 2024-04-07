import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

// TODO: need to finish and check test

test.describe('Apply', () => {
  test(`@P1 @apply @purchase 
    41248_[POS_Application]_Property_Information_Navigation_OnlyRequiredFields[PurchaseSearching]`, 
  async ({steps, loginModal, page}) => {
    const testData = {

    }

    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
    await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
    await steps.purchaseProcessType
      .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
    await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
    await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
    await steps.budget.enterAmount(flowData.propertyValue)
    await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
    await steps.downPayment.enterAmount(flowData.downPayment)
    await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
    await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
    await loginModal.geVerificationCode()
    await steps.rateComparison.chooseRateComparison()
    await steps.fullPersonalInfo.fillFullPersonalInfo(flowData.fullPersonalInfo)

    await test.step(`STEP 5 - View the 'Taxes, Insurance, etc.' options`, async () => {
      await steps.propertyInformation.propertyInformation.escrowingRadiobutton.getLocator()
    })
  })
})
