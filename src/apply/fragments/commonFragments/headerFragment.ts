import {ButtonFragment} from '../buttonFragment'
import {Page} from '@playwright/test'

export class HeaderFragment {
  readonly loginButton: ButtonFragment
  readonly dropdownButton: ButtonFragment
  readonly viewAllApplicationButton: ButtonFragment

  constructor(page: Page) {
    this.loginButton = new ButtonFragment(page, '[data-testid="header__loginButton"]')
    this.dropdownButton = new ButtonFragment(page, '[data-testid="header__dropDownMenuButton"]')
    this.viewAllApplicationButton = new ButtonFragment(page, '[data-testid="dropDownMenu__viewAllApplicationsLink"]')
  }
}
