import {ButtonFragment, CheckboxFragment, InputFragment} from '../fragments'
import {Locator, Page} from '@playwright/test'

export class PersonalInfoPage {
  readonly firstNameInput: InputFragment
  readonly lastNameInput: InputFragment
  readonly emailAddressInput: InputFragment
  readonly mobileNumberInput: InputFragment
  readonly textByVerificationCodeButton: ButtonFragment
  readonly termsCheckbox: CheckboxFragment
  readonly receiveCheckbox: CheckboxFragment
  readonly insteadEmail: Locator

  constructor(page: Page) {
    this.firstNameInput = new InputFragment(page, '[name="firstName"]')
    this.lastNameInput = new InputFragment(page, '[name="lastName"]')
    this.emailAddressInput = new InputFragment(page, '[name="email"]')
    this.mobileNumberInput = new InputFragment(page, '[name="cellPhoneNumber"]')
    this.textByVerificationCodeButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]')
    this.termsCheckbox = new CheckboxFragment(page, page.locator('[name="isConsentObtained"]'))
    this.receiveCheckbox = new CheckboxFragment(page, page.locator('[name="isUserAgreeToReceiveSms"]'))
    this.insteadEmail = page.getByLabel('I agree to receive a login')
  }
}
