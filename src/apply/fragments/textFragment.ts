import {GetPlaywrightElement} from "../shared/sharedInterfaces";
import {Page} from "@playwright/test";

export class TextFragment {
  readonly page: Page;
  readonly root: GetPlaywrightElement;

  constructor(page: Page, root: GetPlaywrightElement) {
    this.page = page;
    this.root = root;
  }
  async getData(): Promise<string> {
    return await this.page.locator(<string>this.root).innerText();
  }
}
