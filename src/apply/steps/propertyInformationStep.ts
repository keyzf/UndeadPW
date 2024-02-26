import {Page, expect} from '@playwright/test'
import {
  HomeownersAssociation,
  MortgageRemaining,
  PropertyDetails,
  PropertyInformation,
  PropertyOtherExpenses,
  PropertyTaxesInsurance,
  RentalIncome,
} from '../interfaces'
import {PropertyInformationPage} from '../pages'
import {BasicStep} from './basicStep'
import {urlData} from 'data/apply'

export class PropertyInformationStep extends BasicStep {
  propertyInformation: PropertyInformationPage

  constructor(page: Page) {
    super(page)
    this.propertyInformation = new PropertyInformationPage(page)
  }

  /**
   *
   * @param data yearBuilt, typeOfProperty, attachmentType, propertyStatus
   */
  async fillPropertyDetails(data: PropertyDetails) {
    await this.propertyInformation.yearBuiltInput.enterValue(data.yearBuilt)
    await this.propertyInformation.typeOfPropertyDropdown.selectValue(data.typeOfProperty)
    await this.propertyInformation.attachmentTypeDropdown.selectValue(data.attachmentType)
    if(data.propertyStatus) {
      await this.propertyInformation.propertyStatus.selectValue(data.propertyStatus)
    }
  }

  /**
   *
   * @param data escrowing, annualProperty, homeownersInsurance
   */
  async fillTaxesInsurance(data: PropertyTaxesInsurance) {
    await this.propertyInformation.annualPropertyInput.enterValue(data.annualProperty, true)
    await this.propertyInformation.homeownersInsuranceInput.enterValue(data.annualProperty, true)
  }

  /**
   *
   * @param data homeownersAssociation
   */
  async fillHomeownerAssociation(data: HomeownersAssociation) {
    await this.propertyInformation.homeownerAssociationRadiobutton.selectValue(data.homeownersAssociation)
  }

  /**
   *
   * @param data otherExpenses
   */
  async fillOtherExpenses(data: PropertyOtherExpenses) {
    await this.propertyInformation.otherExpensesRadiobutton.selectValue(data.otherExpenses)
  }

  /**
   *
   * @param data rentalIncome
   */
  async fillRentalIncome(data: RentalIncome) {
    await this.propertyInformation.rentalIncomeRadiobutton.selectValue(data.rentalIncome)
  }

  /**
   *
   * @param data mortgageRemaining, amountOwned, amountPayment
   */
  async fillMortgageRemaining(data: MortgageRemaining) {
    await this.propertyInformation.amountOwnedInput.enterValue(data.amountOwned, true)
    if(data.amountPayment) {
      await this.propertyInformation.amountPaymentInput.enterValue(data.amountPayment, true)
    }
    if(data.mortgageRemaining) {
      await this.propertyInformation.remainingPropertyRadiobutton.selectValue(data.mortgageRemaining)
    }
  }

  /**
   *
   * @param data Property Information data
   */
  async fillPropertyInformation(data: PropertyInformation) {
    await expect(this.page).toHaveURL(urlData.propertyInformation)
    await this.fillPropertyDetails(data.propertyDetails)
    await this.fillTaxesInsurance(data.taxesInsurance)
    await this.fillHomeownerAssociation(data.homeownerAssociation)
    await this.fillOtherExpenses(data.otherExpenses)
    await this.fillRentalIncome(data.rentalIncome)
    await this.fillMortgageRemaining(data.mortgageRemaining)
    await this.footer.continueButton.click()
  }
}
