import {AccountsWhiteLists} from 'helpers/accounts/whiteLists'
import {cardData, purchaseFlowData, refinanceFlowData} from 'data/apply'
import {Flow} from '../interfaces'
import {LoginModalFragment} from '../fragments'
import {Page} from '@playwright/test'
import {Steps} from '../po'
import ENV from 'data/envs/env'

interface FlowStrategy {
  performActions(userData?: IPersonalInfo): Promise<void>
}

interface IPersonalInfo {
  email: string,
  mobileNumber: string,
  firstName: string,
  lastName: string,
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

  async performActions(userData?: IPersonalInfo): Promise<void> {
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
    await this.steps.propertyAddress.enterAddress(refinanceFlowData.street)
    await this.steps.propertyValue.enterPropertyValue(refinanceFlowData.propertyValue)
    await this.steps.currentMortgageBalance.enterCurrentMortgageBalance(refinanceFlowData.currentMortgageBalance)
    await this.steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
    if(userData) {
      await this.steps.personalInfo.fillPersonalInfoStep(userData)
    } else {
      await this.steps.personalInfo.fillPersonalInfoStep(refinanceFlowData.personalInfo)
    }
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

  async performActions(userData?: IPersonalInfo): Promise<void> {
    await this.steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
    await this.steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
    await this.steps.purchaseProcessType
      .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
    await this.steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
    await this.steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
    await this.steps.purchaseLocation.enterAddress(purchaseFlowData.purchaseAddress.zipCode)
    await this.steps.budget.enterAmount(purchaseFlowData.propertyValue)
    await this.steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
    await this.steps.downPayment.enterAmount(purchaseFlowData.downPayment)
    await this.steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
    if(userData) {
      await this.steps.personalInfo.fillPersonalInfoStep(userData)
    } else {
      await this.steps.personalInfo.fillPersonalInfoStep(purchaseFlowData.personalInfo)
    }
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

  async setFlow(flow: Flow, userData?: IPersonalInfo): Promise<void> {
    if(userData) {
      await this.accounts.addPhoneToWhiteLists(`+1${userData.mobileNumber}`)
    }
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
      await this.flowStrategy.performActions(userData)
    } else {
      throw new Error('Flow strategy not initialized')
    }
  }
}
