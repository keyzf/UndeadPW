import {ApplicationFlow, Steps} from '../po'
import {LoginModalFragment} from '../fragments'
import {test as base} from '@playwright/test'

type ApplyFixtures = {
  steps: Steps
  loginModal: LoginModalFragment,
  applicationFlow: ApplicationFlow
}

export const test = base.extend<ApplyFixtures>({
  steps: async ({page}, use) => {
    await use(new Steps(page))
  },
  loginModal: async ({page}, use) => {
    await use(new LoginModalFragment(page))
  },
  applicationFlow: async ({page}, use) => {
    await use(new ApplicationFlow(page))
  }
})

export {expect} from '@playwright/test'
