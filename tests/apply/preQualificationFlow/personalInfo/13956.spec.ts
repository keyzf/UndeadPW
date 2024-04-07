import {AccountsWhiteLists} from 'helpers/accounts'
import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {generateTestUser} from 'helpers/common/helper'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @purchase 13956_[Accounts]_POS_Auth_PersonalInfo_SignUp_ViaPhone[WithoutFlow]`, 
    async ({steps, loginModal, page}) => {
      const generatedUser = generateTestUser()
      const accounts = new AccountsWhiteLists()

      await test.step(`STEP 1 - Go to Personal Info step`, async () => {
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
        await accounts.addPhoneToWhiteLists(`+1${generatedUser.mobileNumber}`)
        await steps.personalInfo.enterFirstName(generatedUser.firstName)
        await steps.personalInfo.enterLastName(generatedUser.lastName)
        await steps.personalInfo.enterEmail(generatedUser.email)
        await steps.personalInfo.enterMobileNumber(generatedUser.mobileNumber)
        await steps.personalInfo.personalInfo.termsCheckbox.check()
        await steps.personalInfo.personalInfo.receiveCheckbox.check()
        await steps.personalInfo.personalInfo.textByVerificationCodeButton.click()
        await expect(await loginModal.codeInput.getLocator()).toBeVisible()
      })
    })
})
