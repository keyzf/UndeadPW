import {ButtonFragment, InputFragment} from '../../fragments'
import {Locator, Page} from '@playwright/test'
import {MailService} from 'helpers/emailService'

export class LoginModalFragment {
  readonly page: Page
  readonly codeInput: InputFragment
  readonly codeLocator: Locator
  readonly emailInput: InputFragment
  readonly insteadEmail: Locator
  readonly mailService: MailService
  readonly phoneInput: InputFragment
  readonly sendCodeButton: ButtonFragment

  constructor(page: Page) {
    this.page = page
    this.codeInput = new InputFragment(page, '[name="code"]')
    this.codeLocator = page.locator('[data-testid="codeVerification__codeMessage"]')
    this.emailInput = new InputFragment(page, '[name="email"]')
    this.phoneInput = new InputFragment(page, '[name="phoneNumber"]')
    this.sendCodeButton = new ButtonFragment(page, '[type="submit"]')
    this.insteadEmail = page.getByRole('button', {name: 'Email me the code instead'})
    this.mailService = new MailService()
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

  async enterCode(code: string) {
    await this.codeInput.enterValue(code as string)
  }

  async geVerificationCode(): Promise<void> {
    const code = await this.getCode()
    await this.codeInput.enterValue(code as string)
  }

  public async getVerificationCodeFromEmail(email: string): Promise<void> {
    const lastEmail = await this.mailService.getLastEmail(email)
    if (lastEmail) {
      const matches = lastEmail.match(/<b>(.*?)<\/b>/s)
      if (matches && matches[1]) {
        const verificationCode = matches[1]
        await this.codeInput.enterValue(verificationCode)
      } else {
        throw new Error('Verification code not found in the email body.')
      }
    } else {
      throw new Error('No email received.')
    }
  }
}
