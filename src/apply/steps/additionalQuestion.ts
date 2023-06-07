import {BasicStep} from "./basicStep";
import {expect, Page} from "@playwright/test";
import {InputFragment, ButtonFragment} from "../fragments";

export class AdditionalQuestionStep extends BasicStep {
  readonly inputFragment: InputFragment;
  readonly continueButton: ButtonFragment;

  constructor(page: Page) {
    super(page);
    this.inputFragment = new InputFragment(page, '[name="Answer"]');
    this.continueButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]');
  }

  async enterInsuranceAmountReadyToPay(value: string) {
    await expect(this.page).toHaveURL(/.*down-payment-value3/);
    await this.inputFragment.enterValue(value);
    await this.continueButton.click();
  }
}
