import {BasicStep} from './basicStep'
import {Income, IncomeTypeLikeAlimony, IncomeTypeLikeW2} from '../interfaces'
import {IncomePage} from '../pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class IncomeStep extends BasicStep {
  familyMemberValue = 'I am employed by a family member'

  readonly income: IncomePage

  constructor(page: Page) {
    super(page)
    this.income = new IncomePage(page)
  }

  /**
   *
   * @param data Income data
   */
  async fillIncome(income: Income) {
    const w2IncomeData = income.incomeData as IncomeTypeLikeW2
    const alimonyIncomeData = income.incomeData as IncomeTypeLikeAlimony

    await expect(this.page).toHaveURL(urlData.income)
    await this.income.incomeRadiobutton.selectValue(income.income)

    if (income.income === 'Yes') {
      await this.income.incomeTypeDropdown.selectValue(income.incomeType as string)

      if (income.incomeType === 'W2') {
        await this.income.currentlyEmployedRadiobutton.selectValue(w2IncomeData.currentlyEmployed as string)

        if (w2IncomeData.currentlyEmployed === 'No') {
          await this.income.endDateInput.enterValue(w2IncomeData.endData as string)
        }

        await this.income.businessNameInput.enterValue(w2IncomeData.employerName as string)
        await this.income.startDateInput.enterValue(w2IncomeData.startDate as string)
        await this.income.jobTitleInput.enterValue(w2IncomeData.jobTitle as string)
        await this.income.monthlyCompensationInput.enterValue(w2IncomeData.monthlySalary as string)
        await this.income.yearsProfessionInput.enterValue(w2IncomeData.yearsProfession as string)

        if (w2IncomeData.monthProfession) {
          await this.income.monthsProfessionInput.enterValue(w2IncomeData.monthProfession)
        }

        if (w2IncomeData.familyMember) {
          await this.income.familyMemberCheckbox.check(this.familyMemberValue)
        }

        await this.income.businessAddress.enterAddress({address: w2IncomeData.streetAddress})
        await this.income.phoneNumberInput.enterValue(w2IncomeData.phoneNumber as string)
        await this.income.receiveBonusCheckbox.selectValue(w2IncomeData.receiveBonus as string)
      } else if (income.incomeType === 'Alimony') {
        await this.income.startDateInput.enterValue(alimonyIncomeData.startDate as string)
        await this.income.monthlyIncomeInput.enterValue(alimonyIncomeData.monthlyIncome as string)
      }
    }

    await this.footer.continueButton.click()
  }
}
