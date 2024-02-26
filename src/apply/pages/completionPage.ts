import {Page} from '@playwright/test'

import {ButtonFragment, TextFragment} from '../fragments'

export class CompletionPage {
  readonly canvas
  readonly text: TextFragment
  readonly startSigningButton: ButtonFragment

  constructor(page: Page) {
    this.canvas = page.locator('canvas')
    this.text = new TextFragment(page, 'h2')
    this.startSigningButton = new ButtonFragment(page, page.getByRole('button', {name: 'Start Signing'}))
  }
}
