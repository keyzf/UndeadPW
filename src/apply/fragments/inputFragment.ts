import {expect, Page} from '@playwright/test';

interface InputData {
  value: string;
  label: string;
  disabled: boolean;
}

export class InputFragment {
  readonly page: Page;
  readonly root: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  /**
   * @param value - value to type into input
   * @param clear - need to clear input
   */
  async enterValue(value: string, clear?: boolean): Promise<void> {
    const inputLocator = this.page.locator(this.root);
    if (clear) {
      await inputLocator.clear();
      await inputLocator.type(value);
    }
    await inputLocator.type(value, {delay: 70});
    await expect(inputLocator).not.toBeEmpty();
    await this.page.waitForTimeout(500);
  }

  /**
   * @return {InputData} input data
   */
  async getData(): Promise<InputData> {
    const inputLocator = this.page.locator(this.root);
    const labelLocator = inputLocator.locator('label');
    const [value, label, disabled] = await Promise.all([
      inputLocator.innerText(),
      labelLocator.innerText(),
      inputLocator.isDisabled(),
    ]);
    return {value, label, disabled};
  }
}
