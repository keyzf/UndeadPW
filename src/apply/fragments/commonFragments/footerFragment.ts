import {ButtonFragment} from '../buttonFragment'
import {Page} from '@playwright/test'

export class FooterFragment {
  readonly continueButton: ButtonFragment
  readonly goBackButton: ButtonFragment
  readonly page: Page
  readonly root: string

  constructor(page: Page) {
    this.page = page
    this.root = 'footer'
    this.continueButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]')
    this.goBackButton = new ButtonFragment(page, '[data-testid="footer__goBackButton"]')
  }
}
