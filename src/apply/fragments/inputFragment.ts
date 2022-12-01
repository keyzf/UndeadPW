import {Page} from '@playwright/test';

type InputData = {
  value: string,
  label: string,
  disabled: boolean
}

export class InputFragment {
  readonly page!: Page;
  readonly root!: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  /**
  * @param value - value to type into input
  * @param clear - need to clear input
  */
  async enterValue(value: string, clear?: boolean) {
    if(clear) {
      await this.page.locator(this.root).clear();
      await this.page.locator(this.root).type(value);
    }
    await this.page.locator(this.root).type(value);
  }

  /**
  * @return {InputData} input data
  */
     async getData(): Promise<InputData> {
      const data = {
        value: '',
        label: '',
        disabled: false
      }

      data.value = await this.page.locator(this.root).innerText();
      data.label = await this.page.locator(this.root).locator('label').innerText();
      data.disabled = await this.page.locator(this.root).isDisabled();

      return data
    }
}
