import {expect, Page} from "@playwright/test";

export class CheckboxFragment {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
  * @param value - checkbox value
  */
  async checkValue(value: string) {
    await this.page.getByLabel(value).check();
    expect(await this.page.getByLabel(value).isChecked()).toBeTruthy();
  }
}
