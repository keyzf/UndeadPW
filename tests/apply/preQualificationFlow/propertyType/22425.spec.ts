import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('@smoke @apply @refinance 22425_[POS Application]_PreQual_General_Questions_PropertyType_Navigation[Refinance]',
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step('STEP 1 - Select "Refinance" card -> user is placed on Property Type step', async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      })

      await test.step('STEP 2 - Select Any Cards', async () => {
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await expect(page).toHaveURL(urlData.propertyUsageDetails)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on "Property Type" step.
        Click "Go Back" button`, async () => {
        await steps.propertyType.footer.goBackButton.click()
        await steps.propertyType.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.typeOfLoan)
      })
    })
})
