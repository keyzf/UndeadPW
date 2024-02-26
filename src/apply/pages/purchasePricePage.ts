import {InputFragment} from '../fragments'
import {Page} from '@playwright/test'

export class PurchasePricePage {
  readonly priceInput: InputFragment

  constructor(page: Page) {
    this.priceInput = new InputFragment(page, '[name="propertyValue"]')
  }
}
