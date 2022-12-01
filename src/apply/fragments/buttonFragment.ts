import {Page} from "@playwright/test";

type ButtonData = {
  name: string,
  disabled: boolean
}

export class ButtonFragment {
  readonly page!: Page;
  readonly root!: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  /**
  * @param buttonName - name of button
  */
  async clickButton(buttonName?: string) {
    if(buttonName) {
      await this.page.locator('button', { hasText: `${buttonName}` }).click();
    }
    await this.page.locator(this.root).click();
  }

  /**
  * @return {ButtonData} button data
  */
  async getData(): Promise<ButtonData> {
    const data = {
      name: '',
      disabled: false
    }

    data.name = await this.page.locator(this.root).innerText();
    data.disabled = await this.page.locator(this.root).isDisabled();

    return data
  }
}
