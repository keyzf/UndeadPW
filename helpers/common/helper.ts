import {faker} from '@faker-js/faker'
import {Page} from '@playwright/test'

type TTestUser = {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string
}

export function generateTestUser(): TTestUser {
  const testUser: TTestUser = {
    firstName: `aqa_ui_testUser_${faker.name.firstName()}`,
    lastName: `aqa_ui_testUser_${faker.name.lastName()}`,
    email: `aqa_ui_testUser_${faker.internet.email()}`,
    mobileNumber: faker.phone.number('5728######')
  }

  return testUser
}

/**
 *
 * @returns string of the current applicationId from URL
 */
export async function getApplicationId(page: Page): Promise<string> {
  const url = await page.url()
  return url.split('/')[4]
}
