import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {PropertyValuePage} from '../pages'
import {urlData} from 'data/apply'

export class PropertyValueStep extends BasicStep {
  propertyValue: PropertyValuePage

  constructor(page: Page) {
    super(page)
    this.propertyValue = new PropertyValuePage(page)
  }

  async enterPropertyValue(value: string) {
    await expect(this.page).toHaveURL(urlData.propertyValue)
    await this.propertyValue.inputFragment.enterValue(value)
    await this.footer.continueButton.click()
  }
}
