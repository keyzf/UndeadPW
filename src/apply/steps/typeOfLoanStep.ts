import {expect, Page} from "@playwright/test";
import {CardFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class TypeOfLoanStep extends BasicStep {
  readonly card: CardFragment;

  constructor(page: Page) {
    super(page);
    this.card = new CardFragment(page);
  }

  async selectTypeOfLoan(plateName: string) {
    await expect(this.page).toHaveURL(/.*type-of-loan/);
    await this.card.selectCard(plateName);
  }
}
