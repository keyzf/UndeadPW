import {LoginPage} from '../../src/skynet/pages'
import {expect, test} from '@playwright/test'
import {userData} from '../../data/skynet'
import ENV from '../../data/envs/env'

test.describe('Skynet test', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginViaToken(userData)
  })

  test('check navigation to Loans', async ({page}) => {
    await page.waitForSelector('[id="fuse-navbar"]')
    await page.getByTestId('loans').click()
    await expect(page).toHaveURL(/.*loans/)
  })
})
