import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {generateTestUser} from 'helpers/common/helper'
import {MailService} from 'helpers/emailService'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`27564_[POS_Application]_PreQual_Rates_Building_EmailVerificationModal_Navigation_NotLoggedUser[Refinance]`, 
    {tag: ['@P1', '@apply', '@refinance']}, async ({steps, loginModal, page}) => {
      await test.step(`STEP 1 - User is placed on Email Verification modal`, async () => {
        const emailService = new MailService()
        const email = await emailService.generateRandomEmail()
        const newUser = generateTestUser()
        newUser.email = email

        await steps.typeOfLoan.openApply(ENV.APPLY_URL)
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.TOWNHOUSE)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await steps.propertyAddress.enterAddress(flowData.street)
        await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
        await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
        await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await steps.personalInfo.fillPersonalInfoStep(newUser, true)
        await loginModal.getVerificationCodeFromEmail(email)
        await expect(page).toHaveURL(urlData.rateComparison)
      })
    })
})
