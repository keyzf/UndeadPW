import {AccountsWhiteLists} from 'helpers/accounts'
import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {generateTestUser} from 'helpers/common/helper'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`13955_PersonalInfo_Navigation_LoggedUser[Refinance]`, 
    {tag: ['@P1', '@apply', '@refinance']}, async ({steps, loginModal, page}) => {
      const generatedUser = generateTestUser()
      const accounts = new AccountsWhiteLists()
  
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      await expect(page).toHaveURL(urlData.personalInfo)
  
      await test.step(`STEP 1 - Click "Go Back" button`, async () => {
        await steps.personalInfo.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.currentCreditProfile)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      })
  
      await test.step(`STEP 2 - Fill Personal Info step`, async () => {
        await accounts.addPhoneToWhiteLists(`+1${generatedUser.mobileNumber}`)
        await steps.personalInfo.enterFirstName(generatedUser.firstName)
        await steps.personalInfo.enterLastName(generatedUser.lastName)
        await steps.personalInfo.enterEmail(generatedUser.email)
        await steps.personalInfo.enterMobileNumber(generatedUser.mobileNumber)
        await steps.personalInfo.personalInfo.termsCheckbox.check()
        await steps.personalInfo.personalInfo.receiveCheckbox.check()
        await steps.personalInfo.personalInfo.textByVerificationCodeButton.click()
        await loginModal.geVerificationCode()
        await expect(page).toHaveURL(urlData.rateComparison)
      })
    })
})
