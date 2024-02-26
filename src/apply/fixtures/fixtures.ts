import {test as base} from '@playwright/test'

import {LoginModalFragment} from '../fragments'
import {ApplicationFlow, Steps} from '../po'

type ApplyFixtures = {
  steps: Steps
  loginModal: LoginModalFragment
}

export const test = base.extend<ApplyFixtures>({
  steps: async ({page}, use) => {
    await use(new Steps(page))
  },
  loginModal: async ({page}, use) => {
    await use(new LoginModalFragment(page))
  }
})

export {expect} from '@playwright/test'
