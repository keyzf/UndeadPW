import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('@P1 @apply @refinance 10768_TypeOfLoan_Navigation[Refinance]', async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step(`STEP 1 - Select ${cardData.typeOfLoan.REFINANCE}`, async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await expect(page).toHaveURL(urlData.propertyType)
    })
  })
})
