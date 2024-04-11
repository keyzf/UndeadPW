import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`10134_[POS Application]_PreQual_General_Questions_PropertyUsageDetails_Navigation[Refinance]`, 
    {tag: ['@smoke', '@apply', '@refinance']}, async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await test.step('STEP 1 - Go to Property Usage Details step', async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await expect(page).toHaveURL(urlData.propertyUsageDetails)
      })

      await test.step('STEP 2 - Select Any Cards', async () => {
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await expect(page).toHaveURL(urlData.propertyAddress)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on "Property Type" step.
        Click "Go Back" button`, async () => {
        await steps.propertyType.footer.goBackButton.click()
        await steps.propertyType.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.propertyType)
      })
    })
})
