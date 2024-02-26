import {Page} from '@playwright/test'

import {InputFragment} from '../fragments'

export class CreditProfilePage {
  readonly socialSecurityNumber: InputFragment

  constructor(page: Page) {
    this.socialSecurityNumber = new InputFragment(page, '[name*=".socialSecurityNumber"]')
  }
}
