import {ButtonFragment} from '../buttonFragment'
import {Page} from '@playwright/test'
import {TextFragment} from '../textFragment'

export class ModalFragment {
  readonly modalText: TextFragment
  readonly noButton: ButtonFragment
  readonly yesButton: ButtonFragment

  constructor(page: Page) {
    this.modalText = new TextFragment(page, 'p[class*="ConfirmationModalstyles__Question"]')
    this.yesButton = new ButtonFragment(page, 'button:text("Yes")')
    this.noButton = new ButtonFragment(page, 'button:text("No")')
  }
}
