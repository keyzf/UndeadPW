import {Page} from "@playwright/test";

export class DropdownFragment {
  readonly page: Page;
  readonly root: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  /**
  * @param value - value to type into input
  */
  async selectValue(value: string) {
    await this.page.locator(this.root).selectOption(value);
  }
}
