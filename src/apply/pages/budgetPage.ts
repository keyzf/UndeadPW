import {InputFragment} from '../fragments'
import {Page} from '@playwright/test'

export class BudgetPage {
  readonly inputFragment: InputFragment

  constructor(page: Page) {
    this.inputFragment = new InputFragment(page, '[name="propertyValue"]')
  }
}
