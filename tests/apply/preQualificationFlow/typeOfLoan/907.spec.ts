import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('907_TypeOfLoan_Navigation[PurchaseSearching]',{tag: ['@P1', '@apply', '@purchase']}, async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step(`STEP 1 - Select ${cardData.typeOfLoan.PURCHASE}`, async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await expect(page).toHaveURL(urlData.firstTimeHomeBuyer)
    })
  })
})
