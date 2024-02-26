import { faker } from '@faker-js/faker'

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