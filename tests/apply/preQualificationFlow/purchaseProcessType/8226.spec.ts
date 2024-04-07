import {cardData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P2 @apply @purchase 8226_PurchaseProcessType_DefaultStateCheck_[PurchaseSearching]`,
    async ({steps, page}) => {
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await expect(page).toHaveURL(urlData.purchaseProcessType)

      await test.step(`STEP 1 - Verify that Application Progress is "16"`, 
        async () => {
          await expect(await steps.purchaseProcessType.percent.getData()).toBe('16%')
        })

      await test.step(`STEP 2 - Verify that header "Where are you in the process currently?" is displayed on the page`, 
        async () => {
          await expect(await steps.purchaseProcessType.header.getLocator().isVisible()).toBeTruthy()
        })

      await test.step(`STEP 4 - Verify that "Continue" button is not displayed on the step`, 
        async () => {
          await expect(await steps.purchaseProcessType.footer.continueButton.getLocator().isVisible()).toBeFalsy()
        })
    })
})
