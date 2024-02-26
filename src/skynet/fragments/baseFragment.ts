import {Locator, Page} from '@playwright/test'

export class BaseFragment {
  readonly page: Page
  readonly root: string | Locator

  constructor(page: Page, root: string | Locator) {
    this.page = page
    this.root = root
  }

  public getLocator(): Locator {
    return typeof this.root === 'string' ? this.page.locator(this.root) : this.root
  }
}
