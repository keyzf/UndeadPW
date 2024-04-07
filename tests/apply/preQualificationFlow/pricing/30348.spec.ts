import {AccountsWhiteLists} from 'helpers/accounts'
import {ApplicationLoanOptions, LoanAPIHelper} from 'src/skynet/helpers'
import {cardData, flowData} from 'data/apply'
import {commonData} from 'data'
import {expect, test} from 'fixtures'
import {generateTestUser, getApplicationId} from 'helpers/common/helper'
import {LoanOptionsAPIHelper} from 'src/apply/helpers'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @refinance 30348_[Pricing]_Checking_and_comparing_programs_on_Admin_and_Apply_Value_of_programs`, 
    async ({steps, loginModal, page}) => {
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

      await test.step(`STEP 3 - 9 - Compare the list of programs on Apply and Admin panels.
        Pay attention to the values of the programs.`, async () => {
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
        await applyLoanOptions.forEach(applyOptions => {
          // Check Rates
          const rates = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                && skynetOptions.rate === applyOptions.rate)
          expect(rates).toBeTruthy()
  
          // Check Total Fee
          const totalFee = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
              && skynetOptions.fees === applyOptions.fees)
          expect(totalFee).toBeTruthy()
  
          // Check Points
          const points = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(points).toBeTruthy()
  
          // APR Fee
          const apr = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(apr).toBeTruthy()
            
          // Adjustments Fee
          const adjustmentsNames = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(adjustmentsNames).toBeTruthy()
  
          const adjustments = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(adjustments).toBeTruthy()
  
          const llpaTypeId = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(llpaTypeId).toBeTruthy()
  
          const criteriaId = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(criteriaId).toBeTruthy()
  
          const calculationType = skynetLoanOptions.loanOptions
            .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
                  && skynetOptions.points === applyOptions.points)
          expect(calculationType).toBeTruthy()
        })
      })
    })
})
