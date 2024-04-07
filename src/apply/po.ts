import {Flow} from '../apply/interfaces'
import {Page} from '@playwright/test'
import * as steps from './steps'

export class Steps {
  assets: steps.AssetsStep
  budget: steps.BudgetStep
  cashOutAmount: steps.CashOutAmountStep
  completion: steps.CompletionStep
  creditProfile: steps.CreditProfile
  currentCreditProfile: steps.CurrentCreditProfileStep
  currentMortgageBalance: steps.CurrentMortgageBalanceStep
  declarations: steps.DeclarationsStep
  downPayment: steps.DownPaymentStep
  finalRateComparison: steps.FinalRateComparisonStep
  firstTimeBuyer: steps.FirstTimeHomeBuyerStep
  fullPersonalInfo: steps.FullPersonalInfoStep
  income: steps.IncomeStep
  personalInfo: steps.PersonalInfoStep
  propertyAddress: steps.PropertyAddressStep
  propertyInformation: steps.PropertyInformationStep
  propertyType: steps.PropertyTypeStep
  propertyUsageDetails: steps.PropertyUsageDetailsStep
  propertyValue: steps.PropertyValueStep
  purchaseLocation: steps.PurchaseLocationStep
  purchasePrice: steps.PurchasePriceStep
  purchaseProcessType: steps.PurchaseProcessTypeStep
  purposeOfRefinance: steps.PurposeOfRefinanceStep
  rateComparison: steps.RateComparisonStep
  realtorInfo: steps.RealtorInfoStep
  realtorInLoop: steps.RealtorInLoopStep
  reo: steps.ReoStep
  residenceInfo: steps.ResidenceInfoStep
  review: steps.ReviewStep
  titleHolder: steps.TitleHolderStep
  typeOfLoan: steps.TypeOfLoanStep
  workingWithRealtor: steps.WorkingWithRealtorsStep

  constructor(page: Page) {
    this.assets = new steps.AssetsStep(page)
    this.budget = new steps.BudgetStep(page)
    this.cashOutAmount = new steps.CashOutAmountStep(page)
    this.completion = new steps.CompletionStep(page)
    this.creditProfile = new steps.CreditProfile(page)
    this.currentCreditProfile = new steps.CurrentCreditProfileStep(page)
    this.currentMortgageBalance = new steps.CurrentMortgageBalanceStep(page)
    this.declarations = new steps.DeclarationsStep(page)
    this.downPayment = new steps.DownPaymentStep(page)
    this.finalRateComparison = new steps.FinalRateComparisonStep(page)
    this.firstTimeBuyer = new steps.FirstTimeHomeBuyerStep(page)
    this.fullPersonalInfo = new steps.FullPersonalInfoStep(page)
    this.income = new steps.IncomeStep(page)
    this.personalInfo = new steps.PersonalInfoStep(page)
    this.propertyAddress = new steps.PropertyAddressStep(page)
    this.propertyInformation = new steps.PropertyInformationStep(page)
    this.propertyType = new steps.PropertyTypeStep(page)
    this.propertyUsageDetails = new steps.PropertyUsageDetailsStep(page)
    this.propertyValue = new steps.PropertyValueStep(page)
    this.purchaseLocation = new steps.PurchaseLocationStep(page)
    this.purchasePrice = new steps.PurchasePriceStep(page)
    this.purchaseProcessType = new steps.PurchaseProcessTypeStep(page)
    this.purposeOfRefinance = new steps.PurposeOfRefinanceStep(page)
    this.rateComparison = new steps.RateComparisonStep(page)
    this.realtorInfo = new steps.RealtorInfoStep(page)
    this.realtorInLoop = new steps.RealtorInLoopStep(page)
    this.reo = new steps.ReoStep(page)
    this.residenceInfo = new steps.ResidenceInfoStep(page)
    this.review = new steps.ReviewStep(page)
    this.titleHolder = new steps.TitleHolderStep(page)
    this.typeOfLoan = new steps.TypeOfLoanStep(page)
    this.workingWithRealtor = new steps.WorkingWithRealtorsStep(page)
  }
}

export class ApplicationFlow {
  applicationFlow: steps.ApplicationFlow

  constructor(page: Page, flow?: Flow) {
    this.applicationFlow = new steps.ApplicationFlow(page)
  }
}
