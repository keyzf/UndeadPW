import {BasicStep} from "./basicStep";
import {ButtonFragment, CheckboxFragment, InputFragment} from "../fragments";
import {expect, Page} from "@playwright/test";

interface PersonalInfo {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string
}

export class PersonalInfoStep extends BasicStep {
  readonly firstNameInput: InputFragment;
  readonly lastNameInput: InputFragment;
  readonly emailAddressInput: InputFragment;
  readonly mobileNumberInput: InputFragment;
  readonly textByVerificationCodeButton: ButtonFragment;
  readonly termsCheckbox: CheckboxFragment;
  readonly receiveCheckbox: CheckboxFragment;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = new InputFragment(page, '[name="firstName"]');
    this.lastNameInput = new InputFragment(page, '[name="lastName"]');
    this.emailAddressInput = new InputFragment(page, '[name="email"]');
    this.mobileNumberInput = new InputFragment(page, '[name="cellPhoneNumber"]');
    this.textByVerificationCodeButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]');
    this.termsCheckbox = new CheckboxFragment(page);
    this.receiveCheckbox = new CheckboxFragment(page);
  }

  async enterFirstName(value: string) {
    await this.firstNameInput.enterValue(value);
  }

  async enterLastName(value: string) {
    await this.lastNameInput.enterValue(value);
  }

  async enterEmail(value: string) {
    await this.emailAddressInput.enterValue(value);
  }

  async enterMobileNumber(value: string) {
    await this.mobileNumberInput.enterValue(value);
  }

  async fillPersonalInfoStep(data: PersonalInfo) {
    await expect(this.page).toHaveURL(/.*personal-info/);
    await this.enterFirstName(data.firstName);
    await this.enterLastName(data.lastName);
    await this.enterEmail(data.email);
    await this.enterMobileNumber(data.mobileNumber);
    await this.termsCheckbox.toggleCheckboxWithValue('By selecting you agree to the following');
    await this.receiveCheckbox.toggleCheckboxWithValue('I agree to receive a login password from ZeroMortgage');
    await this.textByVerificationCodeButton.click();
  }
}
