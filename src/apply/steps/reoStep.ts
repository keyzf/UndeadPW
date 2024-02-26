import {Page, expect} from '@playwright/test'

import {ModalFragment} from '../fragments/commonFragments'
import {
  AssociationFee,
  OtherExpenses,
  REOTaxesInsurance,
  RemainingProperty,
  Reo,
  StreetAddress,
  TypeOfProperty,
} from '../interfaces'
import {ReoPage} from '../pages'
import {BasicStep} from './basicStep'
import {urlData} from 'data/apply'

export class ReoStep extends BasicStep {
  readonly modal: ModalFragment
  readonly reo: ReoPage

  constructor(page: Page) {
    super(page)
    this.reo = new ReoPage(page)
    this.modal = new ModalFragment(page)
  }

  /**
   *
   * @param data type of property
   */
  async chooseTypeOfProperty(data: TypeOfProperty) {
    await this.reo.typeOfPropertyDropdown.selectValue(data.typeOfProperty)
  }

  /**
   *
   * @param data street address
   */
  async enterStreetAddress(data: StreetAddress) {
    await this.reo.streetAddress.enterAddress({address: data.streetAddress})
  }

  /**
   *
   * @param data remaining of the property
   */
  async chooseRemainOfTheProperty(data: RemainingProperty) {
    await this.reo.remainingPropertyRadiobutton.selectValue(data.remainingProperty)
    if(data.remainingProperty === 'Yes') {
      await this.reo.amountOwnedInput.enterValue(data.amountOwned as string)
      await this.reo.amountOfPaymentInput.enterValue(data.amountOfPayment as string)
    }
  }

  /**
   *
   * @param data taxes insurance
   */
  async fillTaxesInsurance(data: REOTaxesInsurance) {
    await this.reo.escrowingRadiobutton.selectValue(data.escrowing)
    await this.reo.propertyInput.enterValue(data.property)
    await this.reo.homeownersInsuranceInput.enterValue(data.homeownersInsurance)
  }

  /**
   *
   * @param data type of property
   */
  async chooseAssociationFee(data: AssociationFee) {
    await this.reo.associationFeeRadiobutton.selectValue(data.associationFee)
    if(data.associationFee === 'Yes') {
      await this.reo.monthlyAssociationFeeAmountInput.enterValue(data.monthlyAssociationFeeAmount as string)
      if(data.associationName) {
        await this.reo.associationNameInput.enterValue(data.associationName)
      }
      if(data.associationEmail) {
        await this.reo.associationEmailInput.enterValue(data.associationEmail)
      }
      if(data.associationPhoneNumber) {
        await this.reo.associationPhoneNumberInput.enterValue(data.associationPhoneNumber)
      }
    }
  }

  /**
   *
   * @param data type of property
   */
  async fillOtherExpenses(data: OtherExpenses) {
    await this.reo.otherExpensesRadiobutton.selectValue(data.otherExpenses)
    await this.reo.currentMarketValueInput.enterValue(data.currentMarketValue)
    await this.reo.propertyStatusDropdown.selectValue(data.propertyStatus)
    if(data.occupancy === 'Pending Sale' || data.occupancy === 'Retained') {
      await this.reo.occupancyDropdown.selectValue(data.occupancy)
    }
  }

  /**
   *
   * @param data REO data
   */
  async fillReo(data: Reo) {
    await expect(this.page).toHaveURL(urlData.reo)
    await this.reo.reoCheckbox.selectValue(data.reo)
    if(data.reo === 'Yes') {
      await this.chooseTypeOfProperty(data.typeOfProperty as TypeOfProperty)
      await this.enterStreetAddress(data.streetAddress as StreetAddress)
      await this.chooseRemainOfTheProperty(data.remainingProperty as RemainingProperty)
      await this.fillTaxesInsurance(data.taxesInsurance as REOTaxesInsurance)
      await this.chooseAssociationFee(data.associationFee as AssociationFee)
      await this.fillOtherExpenses(data.otherExpenses as OtherExpenses)
    }
    await this.footer.continueButton.click()
    if(data.otherRealEstate === 'Yes') {
      await this.modal.yesButton.click()
    } else if (data.otherRealEstate === 'No') {
      await this.modal.noButton.click()
    }
  }
}
