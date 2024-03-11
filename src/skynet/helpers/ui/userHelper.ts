import {AccountsSignIn} from '../api'
import {Page, chromium} from '@playwright/test'

export type TLoginUserData = {
  email: string,
  password: string,
  domain: string,
  clientId: string,
  companyId: string
}

export class UserHelper {
  accounts = new AccountsSignIn()

  async loginViaTokenOf(data: TLoginUserData, page: Page): Promise<void> {
    const browser = await chromium.launch()

    const response = await this.accounts.signInCredentials(data, data.password)
    if (!response) {
      throw new Error('Couldn\'t find token in response')
    }
    await page.evaluate(
      ({response, data}) => {
        window.localStorage.setItem('lsAccountsJwtToken', JSON.stringify(response))
        window.localStorage.setItem('lsDomainName', data.domain)
      },
      {response, data}
    )

    //await browser.close();
  }
}

