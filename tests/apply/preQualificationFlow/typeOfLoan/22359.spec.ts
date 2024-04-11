import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('22359_PreQual_General_Questions_FirstTimeHomeBuyer_Navigation[Purchase]', {tag: ['@P1', '@apply', '@purchase']},
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step('STEP 1 - Select "Purchase" card -> user is placed on First Time Home Buyer step', async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await expect(page).toHaveURL(urlData.firstTimeHomeBuyer)
      })

      await test.step('STEP 2 - Select "No" card', async () => {
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.NO)
        await expect(page).toHaveURL(urlData.purchaseProcessType)
      })

      await test.step(`STEP 3 - Click "Go Back" button->user is placed on First Time Home buyer step
        Select "Yes" card`, async () => {
        await steps.firstTimeBuyer.footer.goBackButton.click()
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await expect(page).toHaveURL(urlData.purchaseProcessType)
      })

      await test.step(`STEP 4 - Click "Go Back" button -> user is placed on First Time Home buyer step
        Click "Go back" button`, async () => {
        await steps.firstTimeBuyer.footer.goBackButton.click()
        await steps.firstTimeBuyer.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.typeOfLoan)
      })
    })
})
