import {expect, Page} from "@playwright/test";
import {CardFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class PropertyUsageDetailsStep extends BasicStep {
  readonly card: CardFragment;

  constructor(page: Page) {
    super(page);
    this.card = new CardFragment(page);
  }

  async selectPropertyUsageDetails(plateName: string) {
    await expect(this.page).toHaveURL(/.*property-usage-details/);
    await this.card.selectCard(plateName);
  }
}
