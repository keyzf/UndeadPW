import {expect, Page} from "@playwright/test";
import {CardFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class PurposeOfRefinanceStep extends BasicStep {
  readonly card: CardFragment;

  constructor(page: Page) {
    super(page);
    this.card = new CardFragment(page);
  }

  async selectPurposeOfRefinance(plateName: string) {
    await expect(this.page).toHaveURL(/.*purpose-of-refinance/);
    await this.card.selectCard(plateName);
  }
}
