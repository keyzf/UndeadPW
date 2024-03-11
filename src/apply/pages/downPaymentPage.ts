import {InputFragment} from '../fragments'
import {Page} from '@playwright/test'

export class DownPaymentPage {
  readonly inputFragment: InputFragment

  constructor(page: Page) {
    this.inputFragment = new InputFragment(page, '[id*="downPaymentValue"]')
  }
}
