import {GetPlaywrightElement} from '../shared/sharedInterfaces';
import {ElementHandle, Page} from 'playwright';

export class BasicFragment {
  public root: GetPlaywrightElement;
  public page: Page;

  constructor(root: string | GetPlaywrightElement, page: Page) {
    this.root = root;
    this.page = page;
  }

  public async getRoot(): Promise<ElementHandle<Node> | null> {
    const element = typeof this.root === 'string' ? await this.page.$(this.root) : this.root;
    return element as ElementHandle<Node> | null;
  }
}
