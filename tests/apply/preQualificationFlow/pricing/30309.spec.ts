import {AccountsWhiteLists} from 'helpers/accounts'
import {ApplicationLoanOptions, LoanAPIHelper} from '../../../../src/skynet/helpers'
import {cardData, flowData} from 'data/apply'
import {commonData} from 'data'
import {expect, test} from 'fixtures'
import {generateTestUser, getApplicationId} from 'helpers/common/helper'
import {LoanOptionsAPIHelper} from 'src/apply/helpers'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@smoke @apply @refinance 
    30309_[Pricing]_Checking_and_comparing_programs_on_Admin_and_Apply_Number_of_programs`, 
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

    await test.step(`STEP 3 - 9 - Get Program from Skynet and Apply`, async () => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      await accounts.addPhoneToWhiteLists(`+1${generatedUser.mobileNumber}`)
      await steps.personalInfo.fillPersonalInfoStep(generatedUser)
      await loginModal.geVerificationCode()
      await steps.rateComparison.chooseRateComparison()
      await page.route('**/v1', (route) => {
        const headers = route.request().headers()
        const xFunctionsKey = headers['x-functions-key']
        testData.xFunctionsKey = xFunctionsKey
        route.continue()
      })
      const applicationId = await getApplicationId(page)
      applyData.applicationId = applicationId
  
      // GET APPLICATION OPTIONS FROM APPLY AND SKYNET
      const lastApplication = await loanAPIHelper.findLoanByApplicationID(applicationId)
      const skynetLoanOptions = await skynetLoanOptionsAPIHelper
        .getLoanOptions(lastApplication?.loanId as unknown as string, testData.adminLoanOptions)
      const applyLoanOptions = await applyLoanOptionsAPIHelper.getLoanIdAssets(applyData, testData.xFunctionsKey)
      
      await expect(skynetLoanOptions.loanOptions.length).toEqual(applyLoanOptions.length)
      await applyLoanOptions.forEach(applyOptions => {
        // Returns true if at least one element of the array satisfies the condition
        const found = skynetLoanOptions.loanOptions
          .some(skynetOptions => skynetOptions.internalName === applyOptions.internalName 
            && skynetOptions.rate === applyOptions.rate)
        expect(found).toBeTruthy()
      })
    })
  })
})
