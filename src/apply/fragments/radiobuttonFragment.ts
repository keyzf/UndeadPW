import {expect, Page} from "@playwright/test";

export class RadioButtonFragment {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
  * @param value - radio button value
  */
  async selectValue(value: string) {
    await this.page.getByLabel(value).check();
    expect(await this.page.getByLabel(value).isChecked()).toBeTruthy();
  }
}
