import {applicationHeaders, applicationPercent, cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test('@P2 @apply @purchaseSearching 909_PropertyType_DefaultStateCheck[PurchaseSearching]', async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step('STEP 1 - Verify that Application Progress is "25"', async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.NO)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
      await expect(page).toHaveURL(urlData.propertyType)
      await expect(await steps.propertyType.getProgressPercent()).toEqual(applicationPercent.propertyType)
    })

    await test.step(`STEP 2 - Verify that header "What's your type? (Property, that is...)" =>
      What kind of property ar e you interested in? is displayed on the page along with the below cards`, async () => {
      await expect(await steps.propertyType.getStepHeader()).toEqual(applicationHeaders.propertyType)
    })

    await test.step('STEP 4 - Verify that "Continue" button is not displayed on the step', async () => {
      await expect(await steps.propertyType.footer.continueButton.getLocator()).toBeVisible
    })
  })
})
