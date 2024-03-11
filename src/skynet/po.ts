import {Page} from '@playwright/test'
import * as pages from './pages'

export class SkynetPO {
  loginPage: pages.LoginPage

  constructor(page: Page) {
    this.loginPage = new pages.LoginPage(page)
  }
}
