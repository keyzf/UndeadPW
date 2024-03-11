import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @refinance 
    10151_[POS_Application]_PreQual_PropertyAddress_UniqueSubjectPropertyAddress_Navigation[Refinance]`,
  async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step(`STEP 1 - Select "Primary Residence" or "Second Home" or "Investment Property" card -> 
        user is placed on Property Address step`, async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
      await expect(page).toHaveURL(urlData.propertyAddress)
    })

    await test.step(`STEP 2 - Enter unique valid data only into required fields:- Street Address`,
      async () => {
        await steps.propertyAddress.enterAddress(flowData.street)
        await expect(page).toHaveURL(urlData.propertyValue)
      })
  })
})
