import {TextFragment} from "../fragments/";
import {ElementHandle, expect, Page, Locator, test} from "@playwright/test";
import {BasicStep} from './basicStep';

export class RateComparisonStep extends BasicStep {
  private readonly rateComparisonErrorElement: TextFragment;

  constructor(page: Page) {
    super(page);
    this.rateComparisonErrorElement = new TextFragment(this.page, '[class^="errorText__ErrorText"]');
  }

  public async chooseRateComparison(rate?: string) {
    await test.step(`Choose Rate Comparison - ${rate || 'default'}`, async () => {
      await this.page.waitForSelector('[class^="StrokeTextstyles__UpperPart"] >> span');
      const rateElements = await this.page.$$('[class^="StrokeTextstyles__UpperPart"] >> span');
      const rateElement = rate ? rateElements.find(async (element) => {
        const text = await element.innerText();
        return text === rate;
      }) : rateElements[0];
      if (!rateElement) {
        throw new Error(`Element "${rate || 'default'}" not found`);
      }
      await rateElement.click();
    });
  }

  public async chooseProgram(rate?: string) {
    await test.step(`Choose Program - ${rate}`, async () => {
      if (rate) {
        await this.page.waitForSelector('[class^="ProgramCardstyles__CellsContainer"] >> span');
        const programElements = await this.page.$$('[class^="ProgramCardstyles__CellsContainer"] >> span');
        const programElement = programElements.find(async (element) => {
          const text = await element.innerText();
          return text === rate;
        });
        if (!programElement) {
          throw new Error(`Program "${rate}" not found`);
        }
        await programElement.click();
      }
      await this.page.waitForSelector('[class^="ProgramCardstyles__Card"]');
      const programCardElement = this.page.locator('[class^="ProgramCardstyles__Card"]').first();
      if (!programCardElement) {
        throw new Error('Cart not found');
      }
      await programCardElement.click();
    });
  }

  public getRateComparisonError(): TextFragment {
    return this.rateComparisonErrorElement;
  }
}
