import {Page} from "@playwright/test";

export class CheckboxFragment {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Toggles the checkbox with the given value.
   * @param value - The value of the checkbox.
   * @returns A promise that resolves when the checkbox is checked.
   */
  async toggleCheckboxWithValue(value: string): Promise<void> {
    const checkbox = await this.page.locator(`//*[contains(text(), '${value}')]/..//input`);
    await checkbox.click({force: true, delay: 70});
    await this.page.waitForTimeout(500);
  }
}
