import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@smoke @apply @refinance 
    14300_[POS_Application]_Property_Information_Navigation_OnlyRequiredFields[Refinance]`, 
  async ({steps, loginModal, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
    await steps.propertyAddress.enterAddress(flowData.street)
    await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
    await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
    await loginModal.geVerificationCode()
    await steps.rateComparison.chooseRateComparison()
    await steps.fullPersonalInfo.fillFullPersonalInfo(flowData.fullPersonalInfo)

    await test.step(`STEP 1 - 2 - Enter valid data only into required fields`, async () => {
      await steps.propertyInformation.fillPropertyInformation(flowData.propertyInformation)
      await expect(page).toHaveURL(urlData.titleHolder)
    })

    await test.step(`STEP 4 - Click "Go Back" button`, async () => {
      await steps.titleHolder.footer.goBackButton.click()
      await steps.propertyInformation.footer.goBackButton.click()
      await expect(page).toHaveURL(urlData.fullPersonalInfo)
    })
  })
})
