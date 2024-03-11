import {BasePage} from './basePage'
import {ButtonFragment, InputFragment} from '../fragments'
import {Page} from '@playwright/test'
import {TLoginUserData, UserHelper} from '../helpers/ui'
import ENV from 'data/envs/env'

export class LoginPage extends BasePage {
  readonly usernameInput: InputFragment
  readonly passwordInput: InputFragment
  readonly loginButton: ButtonFragment
  // Domain section
  readonly domainInput: InputFragment
  readonly saveButton: ButtonFragment
  readonly resetButton: ButtonFragment
  readonly userHelper: UserHelper

  constructor(page: Page) {
    super(page)
    this.userHelper = new UserHelper()

    this.usernameInput = new InputFragment(page, '[name="email"]')
    this.passwordInput = new InputFragment(page, '[name="password"]')
    this.loginButton = new ButtonFragment(page, '[data-testid="login-button"]')

    this.domainInput = new InputFragment(page, '[name="domain"]')
    this.saveButton = new ButtonFragment(page, ':has-text("Save")')
    this.resetButton = new ButtonFragment(page, ':has-text("Reset")')
  }

  async login(userName: string, password: string) {
    await this.usernameInput.enterValue(userName)
    await this.passwordInput.enterValue(password)
    await this.loginButton.click()
  }

  async loginViaToken(data: TLoginUserData) {
    await this.page.goto(ENV.SKYNET_URL)
    await this.userHelper.loginViaTokenOf(data, this.page)
    await this.page.reload()
  }

  async changeDomain(domain: string) {
    await this.page.keyboard.press('Alt+KeyI')
    await this.domainInput.enterValue(domain, true)
    await this.saveButton.click()
  }
}
