import {cardData, flowData} from 'data/apply'
import {Flow} from '../interfaces'
import {LoginModalFragment} from '../fragments'
import {Page} from '@playwright/test'
import {Steps} from '../po'
import ENV from 'data/envs/env'
import {AccountsWhiteLists} from 'helpers/accounts/whiteLists'

interface FlowStrategy {
  performActions(): Promise<void>
}

class RefinanceFlow implements FlowStrategy {
  private page: Page
  private loginModal: LoginModalFragment
  steps: Steps

  constructor(page: Page) {
    this.page = page
    this.steps = new Steps(page)
    this.loginModal = new LoginModalFragment(page)
  }

  async performActions(): Promise<void> {
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await this.steps.propertyAddress.enterAddress(flowData.street)
    await this.steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await this.steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await this.steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await this.steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
    await this.loginModal.geVerificationCode()
    await this.steps.rateComparison.chooseRateComparison()
  }
}

class PurchaseFlow implements FlowStrategy {
  private page: Page
  private loginModal: LoginModalFragment
  steps: Steps

  constructor(page: Page) {
    this.page = page
    this.steps = new Steps(page)
    this.loginModal = new LoginModalFragment(page)
  }

  async performActions(): Promise<void> {
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.MANUFACTURED_HOME)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
    await this.steps.propertyAddress.enterAddress(flowData.street)
    await this.steps.propertyValue.enterPropertyValue(flowData.propertyValue)
    await this.steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
    await this.steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.FAIR)
    await this.steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
    await this.loginModal.geVerificationCode()
    await this.steps.rateComparison.chooseRateComparison()
  }
}

export class ApplicationFlow {
  private page: Page
  private flowStrategy: FlowStrategy | undefined
  private accounts: AccountsWhiteLists
  steps: Steps

  constructor(page: Page) {
    this.page = page
    this.steps = new Steps(page)
    this.accounts = new AccountsWhiteLists()
  }

  async setFlow(flow: Flow): Promise<void> {
    await this.accounts.addPhoneToWhiteLists('')
    await this.steps.typeOfLoan.openApply(ENV.APPLY_URL)

    switch (flow) {
      case Flow.refinance:
        this.flowStrategy = new RefinanceFlow(this.page)
        break
      case Flow.purchase:
        this.flowStrategy = new PurchaseFlow(this.page)
        break
      case Flow.refinancePrimaryResidence:
        // Handle Refinance Primary Residence flow
        break
      default:
        throw new Error('Unsupported flow')
    }

    // Ensure that performActions is awaited before proceeding
    if (this.flowStrategy) {
      await this.flowStrategy.performActions()
    } else {
      throw new Error('Flow strategy not initialized')
    }
  }
}
