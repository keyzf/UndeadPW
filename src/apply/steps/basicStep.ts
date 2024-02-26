import {DashboardFragment, HeaderFragment, ModalFragment} from '../fragments/commonFragments'
import {FooterFragment, LoginModalFragment, TextFragment} from '../fragments'
import {Page} from 'playwright'

export class BasicStep {
  readonly dashboardFragment: DashboardFragment
  readonly footer: FooterFragment
  readonly header: TextFragment
  readonly headerFragment: HeaderFragment
  readonly loginModalFragment: LoginModalFragment
  readonly modalFragment: ModalFragment
  readonly page: Page
  readonly percent: TextFragment

  constructor(page: Page) {
    this.page = page
    this.dashboardFragment = new DashboardFragment(page)
    this.footer = new FooterFragment(page)
    this.headerFragment = new HeaderFragment(page)
    this.loginModalFragment = new LoginModalFragment(page)
    this.modalFragment = new ModalFragment(page)
    this.header = new TextFragment(page, 'h1')
    this.percent = new TextFragment(page, 'text[dominant-baseline="middle"]')
  }

  async openApply(env: string) {
    // Clear localStorage
    // await this.page.evaluate(() => window.localStorage.clear());

    // // Clear indexedDB
    // await this.page.evaluate(async () => {
    //   const databases = await window.indexedDB.databases();
    //   for (const database of databases) {
    //     await window.indexedDB.deleteDatabase(database.name as string);
    //   }
    // });

    await this.page.goto(env, {timeout: 60000})
    await this.page.waitForURL(/.*applications/)
  }

  /**
   * Skip apply step (click "Continue" button)
   */
  async skipStep() {
    await this.footer.continueButton.click()
  }

  async getProgressPercent() {
    const percent = await this.percent.getData()
    return percent
  }

  async getStepHeader() {
    const header = await this.header.getData()
    return header
  }

  async login(userData: string, saveApp?: boolean) {
    await this.headerFragment.loginButton.click()
    await this.loginModalFragment.phoneInput.enterValue(userData)
    await this.loginModalFragment.sendCodeButton.click()
    await this.loginModalFragment.geVerificationCode()
    if(saveApp) {
      await this.modalFragment.yesButton.click()
    }
    await this.modalFragment.noButton.click()
  }

  async startNewApplication() {
    await this.dashboardFragment.startNewApplicationButton.click()
  }

  async openDashboard() {
    await this.headerFragment.dropdownButton.click()
    await this.headerFragment.viewAllApplicationButton.click()
  }
}
