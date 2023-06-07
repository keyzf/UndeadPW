import {expect, Page} from "@playwright/test";
import {AddressFragment, ButtonFragment} from '../fragments'
import {BasicStep} from "./basicStep";

export class PropertyAddressStep extends BasicStep {
  readonly address: AddressFragment;
  readonly buttonFragment: ButtonFragment;

  constructor(page: Page) {
    super(page);
    this.address = new AddressFragment(page);
    this.buttonFragment = new ButtonFragment(page, '[data-testid="footer__nextButton"]');
  }

  async enterAddress(value: string) {
    await expect(this.page).toHaveURL(/.*property-address/);
    await this.address.enterAddress({address: value});
    await this.buttonFragment.click();
  }
}
