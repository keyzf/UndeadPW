import {ButtonFragment} from '../buttonFragment'
import {Page} from '@playwright/test'

export class ModalFragment {
  readonly noButton: ButtonFragment
  readonly yesButton: ButtonFragment

  constructor(page: Page) {
    this.yesButton = new ButtonFragment(page, 'button:text("Yes")')
    this.noButton = new ButtonFragment(page, 'button:text("No")')
  }
}
