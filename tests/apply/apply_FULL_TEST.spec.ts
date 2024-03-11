import {cardData, flowData} from 'data/apply'
import {DeclarationsValues} from 'src/apply/steps/declarationsSubsteps'
import {expect, test} from 'fixtures'
import ENV from '../../data/envs/env'

test.describe('Apply', () => {
  test.skip('Apply Full Test', async ({steps, loginModal, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await steps.propertyAddress.enterAddress(flowData.street)
    await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
    await loginModal.geVerificationCode()
    await steps.rateComparison.chooseRateComparison()
    await steps.fullPersonalInfo.fillFullPersonalInfo(flowData.fullPersonalInfo)
    await steps.propertyInformation.fillPropertyInformation(flowData.propertyInformation)
    await steps.titleHolder.fillTitleHolder(flowData.titleHolder)
    await steps.residenceInfo.fillResidenceInfo(flowData.residenceInfo)
    await steps.reo.fillReo(flowData.reo)
    await steps.income.fillIncome(flowData.income)
    await steps.assets.fillAssets(flowData.assets)
    await steps.declarations.fillDeclarations(DeclarationsValues.no, 1, flowData.declarations)
    await steps.review.continue()
    await steps.creditProfile.fillSocialSecurityNumber(flowData.fullPersonalInfo.additionalInfo.socialSecurity)
    await steps.finalRateComparison.chooseProgram()
  })
})
