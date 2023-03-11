import {Locator, Page} from '@playwright/test';

export class BaseFragment {
  page: any;
  root: string | Locator;

  constructor(root: string | Locator) {
    this.root = typeof root === 'string' ? root === Locator;
    async (root: string | Locator) => {
       this.root = await this.page(root)
    }
  }
}
