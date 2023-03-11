import {expect, Page} from "@playwright/test";
import {CardFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class CurrentCreditProfileStep extends BasicStep {
  readonly card: CardFragment;

  constructor(page: Page) {
    super(page);
    this.card = new CardFragment(page);
  }

  async selectCurrentCreditProfile(plateName: string) {
    await expect(this.page).toHaveURL(/.*current-credit-profile/);
    await this.card.selectCard(plateName);
  }
}
