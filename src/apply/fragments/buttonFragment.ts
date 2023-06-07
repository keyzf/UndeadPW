import {Locator, Page} from "@playwright/test";

interface ButtonData {
  text: string;
  disabled: boolean;
}

export class ButtonFragment {
  readonly page: Page;
  readonly root: string;

  constructor(page: Page, root: string) {
    this.page = page;
    this.root = root;
  }

  /**
   * Clicks the button.
   */
  async click() {
    await this.page.click(this.root as string, {delay: 300});
  }

  /**
   * Gets the button data.
   * @returns {ButtonData} Button data.
   */
  async getButtonData(): Promise<ButtonData> {
    return {
      text: await this.page.innerText(this.root as string),
      disabled: await this.page.isDisabled(this.root as string),
    };
  }
}
