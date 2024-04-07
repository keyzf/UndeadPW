import {AccountsWhiteLists} from 'helpers/accounts'
import {cardData, flowData} from 'data/apply'
import {commonData} from 'data'
import {expect, test} from 'fixtures'
import {generateTestUser, getApplicationId} from 'helpers/common/helper'
import {LoanOptionsAPIHelper} from 'src/apply/helpers'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@smoke @apply @refinance 30346_[Pricing]_Apply_Checking_that_not_all_programs_in_points_have_a_0_value`, 
    async ({steps, loginModal, page}) => {
      const testData = {
        xFunctionsKey: ''
      }

      const applyData =  {
        companyId: commonData.companyId,
        applicationId: '',
        secretKey: ENV.APPLY_SECRET_KEY
      }

      const generatedUser = generateTestUser()
      const accounts = new AccountsWhiteLists()
      const applyLoanOptionsAPIHelper = new LoanOptionsAPIHelper()

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
        const points = programs.map(program => Number.parseFloat(program.points.split(' ')[1]))
        const filteredPoints = points.filter(option => option !== 0)
        expect(filteredPoints.length).toBeGreaterThan(0)

        const applicationId = await getApplicationId(page)
        applyData.applicationId = applicationId
        const applyLoanOptions = await applyLoanOptionsAPIHelper.getLoanIdAssets(applyData, testData.xFunctionsKey)

        await applyLoanOptions.forEach(applyOptions => {
          expect(Array(applyOptions).length).toBeGreaterThan(0)
        })
      })
    })
})
