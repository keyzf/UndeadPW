import {Page} from '@playwright/test'

import {CheckboxFragment, InputFragment} from '../fragments'

export class CurrentMortgageBalancePage {
  readonly inputFragment: InputFragment
  readonly checkbox: CheckboxFragment

  constructor(page: Page) {
    this.inputFragment = new InputFragment(page, '[name="firstMortgageBalance"]')
    this.checkbox = new CheckboxFragment(page, 'label[class*="Checkboxstyles__CheckboxWrapper"]')
  }
}
