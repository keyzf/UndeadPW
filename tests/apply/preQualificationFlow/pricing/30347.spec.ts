import {AccountsWhiteLists} from 'helpers/accounts'
import {cardData, flowData} from 'data/apply'
import {expect, test} from 'fixtures'
import {generateTestUser} from 'helpers/common/helper'
import {TRates} from 'src/apply/steps'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@smoke @apply @refinance 30347_[Pricing]_Apply_The_programs_with_negative_points_are_included`, 
    async ({steps, loginModal, page}) => {
      const testData = {
        xFunctionsKey: ''
      }

      const generatedUser = generateTestUser()
      const accounts = new AccountsWhiteLists()

      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.TOWNHOUSE)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
      await accounts.addPhoneToWhiteLists(`+1${generatedUser.mobileNumber}`)
      await steps.personalInfo.fillPersonalInfoStep(generatedUser)
      await loginModal.geVerificationCode()
      await page.route('**/v1', (route) => {
        const headers = route.request().headers()
        const xFunctionsKey = headers['x-functions-key']
        testData.xFunctionsKey = xFunctionsKey
        route.continue()
      })

      await test.step(`STEP 3 - Pay attention to the values of points in programs on Apply`, async () => {
        const programs = await steps.rateComparison.getProgramData()
        const lenderCredits: TRates[] = []
        for (const program of programs) {
          await program.points.split(':')[0] === 'Lender Credit' && lenderCredits.push(program)
        }
        expect(lenderCredits.length).toBeGreaterThan(0)
      })
    })
})
