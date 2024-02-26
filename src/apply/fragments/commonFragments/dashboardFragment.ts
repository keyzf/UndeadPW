import {ButtonFragment} from '../buttonFragment'
import {Page} from '@playwright/test'

export class DashboardFragment {
  readonly startNewApplicationButton: ButtonFragment
  readonly addYourRealtorButton: ButtonFragment

  constructor(page: Page) {
    this.startNewApplicationButton =
      new ButtonFragment(page, 'button:text("Start new application")')
    this.addYourRealtorButton = new ButtonFragment(page, 'div[class*="Realtorstyles__RealtorContainer"] > button')
  }
}
