import {cardData, refinanceFlowData} from 'data/apply'
import {DeclarationsValues} from 'src/apply/steps/declarationsSubsteps'
import {expect, test} from 'fixtures'
import ENV from '../../data/envs/env'

test.describe.skip('Apply', () => {
  test.skip('Apply Full Test', async ({steps, loginModal, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await steps.propertyAddress.enterAddress(refinanceFlowData.street)
    await steps.propertyValue.enterPropertyValue(refinanceFlowData.propertyValue)
    await steps.currentMortgageBalance.enterCurrentMortgageBalance(refinanceFlowData.currentMortgageBalance)
    await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await steps.personalInfo.fillPersonalInfoStep(refinanceFlowData.personalInfo)
    await loginModal.geVerificationCode()
    await steps.rateComparison.chooseRateComparison()
    await steps.fullPersonalInfo.fillFullPersonalInfo(refinanceFlowData.fullPersonalInfo)
    await steps.propertyInformation.fillPropertyInformation(refinanceFlowData.propertyInformation)
    await steps.titleHolder.fillTitleHolder(refinanceFlowData.titleHolder)
    await steps.residenceInfo.fillResidenceInfo(refinanceFlowData.residenceInfo)
    await steps.reo.fillReo(refinanceFlowData.reo)
    await steps.income.fillIncome(refinanceFlowData.income)
    await steps.assets.fillAssets(refinanceFlowData.assets)
    await steps.declarations.fillDeclarations(DeclarationsValues.no, 1, refinanceFlowData.declarations)
    await steps.review.continue()
    await steps.creditProfile.fillSocialSecurityNumber(refinanceFlowData.fullPersonalInfo.additionalInfo.socialSecurity)
    await steps.finalRateComparison.chooseProgram()
  })
})
