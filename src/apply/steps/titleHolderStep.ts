import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {TitleHolder} from '../interfaces'
import {TitleHolderPage} from '../pages'
import {urlData} from 'data/apply'

export class TitleHolderStep extends BasicStep {
  readonly titleHolder: TitleHolderPage

  constructor(page: Page) {
    super(page)
    this.titleHolder = new TitleHolderPage(page)
  }

  async fillTitleHolder(data: TitleHolder) {
    await expect(this.page).toHaveURL(urlData.titleHolder)
    await this.titleHolder.titleHolderRadiobutton.selectValue(data.isTitleHolder)
    if(data.isTitleHolder === 'Yes') {
      await this.titleHolder.firstNameInput.enterValue(data.titleHolder?.firstName as string)
      if(data.titleHolder?.middleName) {
        await this.titleHolder.middleNameInput.enterValue(data.titleHolder?.middleName as string)
      }
      await this.titleHolder.lastNameInput.enterValue(data.titleHolder?.lastName as string)
      if (data.titleHolder?.suffix) {
        await this.titleHolder.suffixDropdown.selectValue(data.titleHolder.suffix)
      }
      await this.titleHolder.emailAddressInput.enterValue(data.titleHolder?.emailAddress as string)
      await this.titleHolder.cellPhoneNumberInput.enterValue(data.titleHolder?.cellPhoneNumber as string)
      if(data.titleHolder?.mannerHeld) {
        await this.titleHolder.mannerHeldDropdown.selectValue(data.titleHolder.mannerHeld)
      }
    }
    await this.footer.continueButton.click()
  }
}
