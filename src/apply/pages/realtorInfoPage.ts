import {CheckboxFragment, InputFragment} from '../fragments'
import {Page} from '@playwright/test'

export class RealtorInfoPage {
  readonly firstNameInput: InputFragment
  readonly lastNameInput: InputFragment
  readonly emailInput: InputFragment
  readonly mobileNumberInput: InputFragment
  readonly shareLoanCheckbox: CheckboxFragment 

  constructor(page: Page) {
    this.firstNameInput = new InputFragment(page, '[name="realtorFirstName"]')
    this.lastNameInput = new InputFragment(page, '[name="realtorLastName"]')
    this.emailInput = new InputFragment(page, '[name="realtorEmail"]')
    this.mobileNumberInput = new InputFragment(page, '[name="realtorPhoneNumber"]')
    this.shareLoanCheckbox = new CheckboxFragment(page, '[name="shareLoanStatusWithRealtor"]')
  }
}
