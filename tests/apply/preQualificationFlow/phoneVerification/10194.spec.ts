import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P2 @apply @refinance 10194_PhoneVerification_NoPrograms_NotLoggedUser[Refinance]`, 
    async ({steps, loginModal, page}) => {
      const testData = {
        propertyValue: '1000000',
        currentMortgageBalance: '450000',
        errorText: `Your loan scenario qualifies for the expertise of our dedicated loan experts`
      }

      await test.step(`STEP 1 - Go to Personal Info step`, async () => {
        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
        await steps.propertyAddress.enterAddress(flowData.street)
        await steps.propertyValue.enterPropertyValue(testData.propertyValue)
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(testData.currentMortgageBalance)
        await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.BAD)
        await expect(page).toHaveURL(urlData.personalInfo)
      })
  
      await test.step(`STEP 2 - Fill Personal Info step`, async () => {
        await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
        await loginModal.geVerificationCode()
        await steps.rateComparison.rateComparisonErrorElement.getLocator().waitFor({state: 'visible'})
        expect(await steps.rateComparison.rateComparisonErrorElement.getData()).toContain(testData.errorText)
      })
    })
})
