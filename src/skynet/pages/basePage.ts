import {Page} from '@playwright/test'
import * as api from '../helpers/api'

export class BasePage {
  readonly page: Page
  readonly loanAPIHelper: api.LoanAPIHelper

  constructor(page: Page) {
    this.page = page
    // API HELPERS
    this.loanAPIHelper = new api.LoanAPIHelper()
  }
  
  /**
   *
   * @param env URL or ENV param
   */
  async openSkynet(env: string) {
    await this.page.goto(env)
    await this.page.waitForURL(/.*/)
  }
}
