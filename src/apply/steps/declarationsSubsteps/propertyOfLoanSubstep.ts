import {BasicStep} from '../basicStep'
import {DeclarationsValues} from './declarationValues'
import {FooterFragment} from '../../fragments'
import {OwnerShipInterest, PropertyAndLoan, PropertyOfLoanValues} from '../../interfaces'
import {Page, expect} from '@playwright/test'
import {PropertyOfLoanPage} from '../../pages'
import {urlData} from 'data/apply'

export class PropertyOfLoanSubstep extends BasicStep {
  readonly propertyOfLoanPage: PropertyOfLoanPage
  readonly footer: FooterFragment

  constructor(page: Page) {
    super(page)
    this.propertyOfLoanPage = new PropertyOfLoanPage(page)
    this.footer = new FooterFragment(page)
  }

  private async fillOwnershipInterest(data: OwnerShipInterest) {
    await this.propertyOfLoanPage.typeOfPropertyDropdown.selectValue(data.typePropertyOwn)
    await this.propertyOfLoanPage.holdTitleDropdown.selectValue(data.holdTitleProperty)
  }

  private async fillBorrowingAnyMoney(data: PropertyOfLoanValues) {
    await this.propertyOfLoanPage.amountInput.enterValue(data.amount as string, true)
  }

  async fillPropertyOfLoan(value: DeclarationsValues): Promise<void>
  async fillPropertyOfLoan(value: DeclarationsValues, data?: PropertyOfLoanValues): Promise<void>
  async fillPropertyOfLoan(value: PropertyAndLoan): Promise<void>
  async fillPropertyOfLoan(arg: DeclarationsValues | PropertyAndLoan, data?: PropertyOfLoanValues): Promise<void> {
    await expect(this.page).toHaveURL(urlData.propertyAndLoan)

    if(typeof arg === 'string') {
      if(arg === DeclarationsValues.no) {
        await this.propertyOfLoanPage.occupyPropertyRadiobutton.selectNo()
        await this.propertyOfLoanPage.ownershipInterestRadiobutton.selectNo()
        await this.propertyOfLoanPage.borrowingMoneyRadiobutton.selectNo()
        await this.propertyOfLoanPage.applyingMortgageLoanRadiobutton.selectNo()
        await this.propertyOfLoanPage.applyingNewCreditRadiobutton.selectNo()
        await this.propertyOfLoanPage.subjectLienRadiobutton.selectNo()
        await this.footer.continueButton.click()
      } else if(arg === DeclarationsValues.yes && data) {
        await this.propertyOfLoanPage.occupyPropertyRadiobutton.selectYes()
        await this.propertyOfLoanPage.ownershipInterestRadiobutton.selectYes()
        await this.fillOwnershipInterest({
          typePropertyOwn: data.ownerShipInterest?.typePropertyOwn as string,
          holdTitleProperty: data.ownerShipInterest?.holdTitleProperty as string})
        await this.propertyOfLoanPage.borrowingMoneyRadiobutton.selectYes()
        await this.fillBorrowingAnyMoney(data)
        await this.propertyOfLoanPage.amountInput.enterValue(data.amount as string, true)
        await this.propertyOfLoanPage.applyingMortgageLoanRadiobutton.selectYes()
        await this.propertyOfLoanPage.applyingNewCreditRadiobutton.selectYes()
        await this.propertyOfLoanPage.subjectLienRadiobutton.selectYes()
        await this.footer.continueButton.click()
      }
    } else {
      await this.propertyOfLoanPage.occupyPropertyRadiobutton.selectValue(arg.occupyProperty)
      await this.propertyOfLoanPage.ownershipInterestRadiobutton.selectValue(arg.ownershipInterest)
      if(arg.ownershipInterest === 'Yes') {
        await this.fillOwnershipInterest(arg.ownershipInterestData)
      }
      await this.propertyOfLoanPage.borrowingMoneyRadiobutton.selectValue(arg.borrowingMoney)
      if(arg.borrowingMoney === 'Yes') {
        await this.fillBorrowingAnyMoney({amount: data?.amount})
      }
      await this.propertyOfLoanPage.applyingMortgageLoanRadiobutton.selectValue(arg.mortgageLoan)
      await this.propertyOfLoanPage.applyingNewCreditRadiobutton.selectValue(arg.newCredit)
      await this.propertyOfLoanPage.subjectLienRadiobutton.selectValue(arg.firstMortgageLien)
      await this.footer.continueButton.click()
    }
  }
}
