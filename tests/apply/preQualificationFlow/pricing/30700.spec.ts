import {AccountsWhiteLists} from 'helpers/accounts'
import {ApplicationLoanOptions, LoanAPIHelper} from 'src/skynet/helpers'
import {cardData, flowData} from 'data/apply'
import {commonData} from 'data'
import {expect, test} from 'fixtures'
import {generateTestUser, getApplicationId} from 'helpers/common/helper'
import {LoanOptionsAPIHelper} from 'src/apply/helpers'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`30700_[Pricing]_Checking_that_only_one_program_can_have_points_with_0_value`, 
    {tag: ['@P1', '@apply', '@refinance']}, async ({steps, loginModal, page}) => {
      const testData = {
        adminLoanOptions : {
          appraisedValue: 400000,
          loanAmount: 115000,
          refinancePurpose: 'LowerMonthlyPayment',
          loanPurpose: 'Refinance',
          heloc: null,
          taxesInsuranceEscrowed: true,
          requestMetadata: {
            tabId: 0
          },
          isTest: false
        },
        xFunctionsKey: ''
      }

      const applyData =  {
        companyId: commonData.companyId,
        applicationId: '',
        secretKey: ENV.APPLY_SECRET_KEY
      }

      const loanAPIHelper = new LoanAPIHelper()
      const skynetLoanOptionsAPIHelper = new ApplicationLoanOptions()
      const applyLoanOptionsAPIHelper = new LoanOptionsAPIHelper()
      const generatedUser = generateTestUser()
      const accounts = new AccountsWhiteLists()

      await test.step(`STEP 3 - 9 - Compare the list of programs on Apply and Admin panels.`, async () => {
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
        await steps.rateComparison.programCarousel.waitFor({state: 'visible'})

        // Intercepting request to get x-functions-key
        await page.route('**/v1', (route) => {
          const headers = route.request().headers()
          const xFunctionsKey = headers['x-functions-key']
          testData.xFunctionsKey = xFunctionsKey
          route.continue()
        })

        // Getting application ID
        const applicationId = await getApplicationId(page)
        applyData.applicationId = applicationId

        // Get loan options from Admin panel
        const lastApplication = await loanAPIHelper.findLoanByApplicationID(applicationId)
        const skynetLoanOptions = await skynetLoanOptionsAPIHelper.getLoanOptions(
            lastApplication?.loanId as unknown as string,
            testData.adminLoanOptions
        )

        // Get loan options from Apply panel
        const applyLoanOptions = await applyLoanOptionsAPIHelper.getLoanIdAssets(applyData, testData.xFunctionsKey)

        // Asserting loan options
        await expect(skynetLoanOptions.loanOptions.length).toEqual(applyLoanOptions.length)

        // Comparing each loan option
        const skynetProgramNames = new Set<string>()
        const applyProgramNames = new Set<string>()

        skynetLoanOptions.loanOptions.forEach(obj1 => {
          // Add skynet program names to set
          skynetProgramNames.add(obj1.internalName)
        })
        skynetProgramNames.forEach(skynetProgramName => {
        
          // Filter options with 0 value
          const zeroPointsOptions = skynetLoanOptions.loanOptions
            .filter(option1 => option1.internalName === skynetProgramName)
            .filter(option2 => option2.points === 0)
          expect(zeroPointsOptions.length, `Skynet Loan program ${skynetProgramName} options with 0 points`)
            .not.toBeGreaterThan(1)

          applyLoanOptions.forEach(obj1 => {
            // Add apply program names to set
            applyProgramNames.add(obj1.internalName)
          })
          applyProgramNames.forEach(applyProgramName => {
            // Filter options with 0 value
            const zeroPointsOptions = applyLoanOptions
              .filter(option1 => option1.internalName === applyProgramName)
              .filter(option2 => option2.points === 0)
            expect(zeroPointsOptions.length, `Apply Loan program ${applyProgramName} options with 0 points`)
              .not.toBeGreaterThan(1)
          })
        })
      })
    })
})
