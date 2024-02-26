import {Page} from '@playwright/test'

import {InputFragment} from '../fragments'

export class PropertyValuePage {
  readonly inputFragment: InputFragment

  constructor(page: Page) {
    this.inputFragment = new InputFragment(page, '[name="propertyValue"]')
  }
}
