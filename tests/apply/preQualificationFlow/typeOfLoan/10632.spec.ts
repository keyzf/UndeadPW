import {ApplicationProgressFragment, FooterFragment} from 'src/apply/fragments'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('10632_TypeOfLoan_DefaultStateCheck[WithoutFlow]', {tag: ['@P1', '@apply']}, async ({steps, page}) => {
    const footer = new FooterFragment(page)
    const progressFragment = new ApplicationProgressFragment(page)

    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step('STEP 1- Verify that Application Progress is "0"', async () =>{
      expect((await progressFragment.getData()).percentage).toEqual('0%')
    })

    await test.step(`STEP 2 - Verify that header 'What would you like to do today?'
      is displayed on the page along with the below cards`, async () =>{
      expect((await progressFragment.getData()).text).toEqual('Application Progress')
    })

    await test.step('STEP 3 - Verify that "Continue" button is not displayed on the step', async () =>{
      await footer.continueButton.getLocator().isHidden()
    })

    await test.step('STEP 4 - Verify that "Go Back" button is not displayed on the step', async () =>{
      await footer.goBackButton.getLocator().isHidden()
    })
  })
})
