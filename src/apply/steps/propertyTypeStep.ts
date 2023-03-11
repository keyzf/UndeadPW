import {expect, Page} from "@playwright/test";
import {CardFragment, StepHeaderFragment} from "../fragments";
import {BasicStep} from "./basicStep";

export class PropertyTypeStep extends BasicStep {
  readonly card: CardFragment;
  readonly stepHeader: StepHeaderFragment;

  constructor(page: Page) {
    super(page);
    this.card = new CardFragment(page);
    this.stepHeader = new StepHeaderFragment(page);
  }

  async selectPropertyType(plateName: string) {
    await expect(this.page).toHaveURL(/.*property-type/);
    await this.card.selectCard(plateName);
  }
}
