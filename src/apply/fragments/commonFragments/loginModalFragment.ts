import {ButtonFragment, InputFragment} from '../../fragments'
import {Locator, Page} from '@playwright/test'

export class LoginModalFragment {
  readonly page: Page
  readonly codeInput: InputFragment
  readonly codeLocator: Locator
  readonly emailInput: InputFragment
  readonly phoneInput: InputFragment
  readonly sendCodeButton: ButtonFragment

  constructor(page: Page) {
    this.page = page
    this.codeInput = new InputFragment(page, '[name="code"]')
    this.codeLocator = page.locator('[data-testid="codeVerification__codeMessage"]')
    this.emailInput = new InputFragment(page, '[name="email"]')
    this.phoneInput = new InputFragment(page, '[name="phoneNumber"]')
    this.sendCodeButton = new ButtonFragment(page, '[type="submit"]')
  }

  async enterPhoneNumber(value: string): Promise<void> {
    await this.phoneInput.enterValue(value)
  }

  async enterEmail(value: string): Promise<void> {
    await this.emailInput.enterValue(value)
  }

  async getCode() {
    return await this.codeLocator.innerText()
  }

  async switchToggle(param: string) {
    await this.page.click(`"${param}"`)
  }

  async geVerificationCode(): Promise<void> {
    const code = await this.getCode()
    await this.codeInput.enterValue(code as string)
  }
}
