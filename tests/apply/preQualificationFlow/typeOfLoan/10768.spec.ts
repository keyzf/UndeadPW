import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('10768_TypeOfLoan_Navigation[Refinance]', {tag: ['@P1', '@apply', '@refinance']}, async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step(`STEP 1 - Select ${cardData.typeOfLoan.REFINANCE}`, async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await expect(page).toHaveURL(urlData.propertyType)
    })
  })
})
