import {Page} from '@playwright/test';

export class InputFragment {
  readonly page!: Page;
  readonly root!: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  async enterValue(value: string, clear?: boolean) {
    if(clear) {
      await this.page.locator(this.root).clear();
      await this.page.locator(this.root).type(value);
    }
    await this.page.locator(this.root).type(value);
  }
}
