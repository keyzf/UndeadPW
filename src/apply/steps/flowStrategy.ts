import {Page} from "@playwright/test"
import {Steps} from "../po"
import {cardData, flowData} from 'data/apply'

interface FlowStrategy {
  performActions(testData: any): Promise<void>
}

class RefinanceFlow implements FlowStrategy {
  private page: Page
  steps: Steps

  constructor(page: Page) {
    this.page = page
    this.steps = new Steps(page)
  }

  async performActions(testData: any): Promise<void> {
    await this.steps.typeOfLoan.openApply('https://apply.qa.cyberdynemortgage.com/')
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await this.steps.propertyAddress.enterAddress(flowData.street)
    await this.steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await this.steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await this.steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await this.steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
  }
}

class PurchaseFlow implements FlowStrategy {
  private page: Page
  steps: Steps

  constructor(page: Page) {
    this.page = page
    this.steps = new Steps(page)
  }

  async performActions(testData: any): Promise<void> {
    await this.steps.typeOfLoan.openApply('https://apply.qa.cyberdynemortgage.com/')
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await this.steps.propertyAddress.enterAddress(flowData.street)
    await this.steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await this.steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await this.steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await this.steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
  }
}
