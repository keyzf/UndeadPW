import {Bankruptcy, Finances} from '../../interfaces'
import {BasicStep} from '../basicStep'
import {DeclarationsValues} from './declarationValues'
import {FinancesPage} from '../../pages'
import {FooterFragment} from '../../fragments'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class FinancesSubstep extends BasicStep {
  readonly financesPage: FinancesPage
  readonly footer: FooterFragment

  constructor(page: Page) {
    super(page)
    this.financesPage = new FinancesPage(page)
    this.footer = new FooterFragment(page)
  }

  async fillFinances(value: DeclarationsValues): Promise<void>
  async fillFinances(value: DeclarationsValues, data?: Bankruptcy): Promise<void>
  async fillFinances(data: Finances): Promise<void>
  async fillFinances(arg: DeclarationsValues | Finances, data?: Bankruptcy): Promise<void> {
    await expect(this.page).toHaveURL(urlData.yourFinances)

    if(typeof arg === 'string') {
      if(arg === DeclarationsValues.no) {
        await this.financesPage.coSignerRadiobutton.selectNo()
        await this.financesPage.outstandingJudgmentsRadiobutton.selectNo()
        await this.financesPage.federalDebtRadiobutton.selectNo()
        await this.financesPage.partyLawsuitRadiobutton.selectNo()
        await this.financesPage.conveyedPropertyRadiobutton.selectNo()
        await this.financesPage.preForeclosureRadiobutton.selectNo()
        await this.financesPage.propertyForeclosedRadiobutton.selectNo()
        await this.financesPage.bankruptcyRadiobutton.selectNo()
        await this.footer.continueButton.click()
      } else if(arg === DeclarationsValues.yes && data) {
        await this.financesPage.coSignerRadiobutton.selectYes()
        await this.financesPage.outstandingJudgmentsRadiobutton.selectYes()
        await this.financesPage.federalDebtRadiobutton.selectYes()
        await this.financesPage.partyLawsuitRadiobutton.selectYes()
        await this.financesPage.conveyedPropertyRadiobutton.selectYes()
        await this.financesPage.preForeclosureRadiobutton.selectYes()
        await this.financesPage.propertyForeclosedRadiobutton.selectYes()
        await this.financesPage.bankruptcyRadiobutton.selectYes()
        await this.financesPage.bankruptcyTypeCheckbox.check(data.typeBankruptcy as string)
        await this.footer.continueButton.click()
      }
    } else {
      await this.financesPage.coSignerRadiobutton.selectValue(arg.coSigner)
      await this.financesPage.outstandingJudgmentsRadiobutton.selectValue(arg.outstandingJudgments)
      await this.financesPage.partyLawsuitRadiobutton.selectValue(arg.partyToLawsuit)
      await this.financesPage.conveyedPropertyRadiobutton.selectValue(arg.currentlyDelinquent)
      await this.financesPage.preForeclosureRadiobutton.selectValue(arg.preForeclosure)
      await this.financesPage.propertyForeclosedRadiobutton.selectValue(arg.propertyForeclosed)
      await this.financesPage.bankruptcyRadiobutton.selectValue(arg.typeBankruptcy as string)
      if(arg.bankruptcy === 'Yes') {
        await this.financesPage.bankruptcyTypeCheckbox.check(data as unknown as string)
      }
      await this.footer.continueButton.click()
    }
  }
}
