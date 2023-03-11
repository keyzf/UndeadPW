import {expect, Page} from "@playwright/test";
import {ButtonFragment, InputFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class CurrentMortgageBalanceStep extends BasicStep {
  readonly inputFragment: InputFragment;
  readonly continueButton: ButtonFragment;

  constructor(page: Page) {
    super(page);
    this.inputFragment = new InputFragment(page, '[name="firstMortgageBalance"]');
    this.continueButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]');
  }

  async enterCurrentMortgageBalance(value: string) {
    await expect(this.page).toHaveURL(/.*current-mortgage-balance/);
    await this.inputFragment.enterValue(value);
    await this.continueButton.clickButton('Continue');
  }
}
