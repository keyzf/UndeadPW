import {test, expect} from '@playwright/test'
import ENV from '../../data/envs/env'

test.skip('Skynet Test', async ({ page }) => {
  await page.goto(ENV.SKYNET_URL)
  await expect(page).toHaveTitle('Skynet')
})
