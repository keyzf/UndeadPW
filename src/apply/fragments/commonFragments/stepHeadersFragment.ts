import {Locator, Page} from '@playwright/test';

type StepHeaders = {
  text?: string,
}

export class StepHeaderFragment {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
  * @return {StepHeaders} step header data
  */
  async getData(): Promise<StepHeaders> {
    const data = {
      text: ''
    }
    data.text = await this.page.locator('h1').innerText();
    return data
  }
}
