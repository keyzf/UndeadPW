import {expect, Page} from "@playwright/test";
import {ButtonFragment, InputFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class PropertyValueStep extends BasicStep {
  readonly inputFragment: InputFragment;
  readonly continueButton: ButtonFragment;

  constructor(page: Page) {
    super(page);
    this.inputFragment = new InputFragment(page, '[name="propertyValue"]');
    this.continueButton = new ButtonFragment(page, '[data-testid="footer__nextButton"]');
  }

  async enterPropertyValue(value: string) {
    await expect(this.page).toHaveURL(/.*property-value/);
    await this.inputFragment.enterValue(value);
    await this.continueButton.clickButton('Continue');
  }
}
