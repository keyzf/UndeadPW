import {InputFragment} from '../fragments'
import {Page} from '@playwright/test'

export class AdditionalQuestionPage {
  readonly inputFragment: InputFragment

  constructor(page: Page) {
    this.inputFragment = new InputFragment(page, '[name="Answer"]')
  }
}
