import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {faker} from '@faker-js/faker'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@P1 @apply @purchase 
    957_[POS_Application]_PreQual_General_Questions_DownPayment_SetValidCustomValue_Navigation[PurchaseSearching]`, 
  async ({steps, page}) => {
    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step('STEP 1 - Go to Down Payment step', async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
      await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
      await steps.purchaseProcessType
        .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.SECOND_HOME)
      await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
      await steps.budget.enterAmount(flowData.propertyValue)
      await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
      await expect(page).toHaveURL(urlData.downPayment)
    })

    await test.step(`STEP 2 - 
      Enter the custom value into Amount field that matches the down payment value from one of the proposed cards`, 
    async () => {
      await steps.downPayment.downPayment.inputFragment.enterValue('60,000')
      await expect(await steps.downPayment.cards.checkMark.nth(1)).toBeVisible()
    })

    await test.step(`STEP 3 - Enter the custom value into Amount field that 
    matches the down payment value from one of the proposed cards`, async () => {
      await steps.downPayment.downPayment.inputFragment.enterValue(faker.finance.amount(1000, 9999))
      const cardLocators = await steps.downPayment.cards.checkMark.all()

      for (const cardLocator of cardLocators) {
        const ariaHiddenValue = await cardLocator.getAttribute('aria-hidden')
        await expect(ariaHiddenValue).toBe('true')
      }
    })

    await test.step(`STEP 4 - Enter valid custom value into Amount field`, async () => {
      await steps.downPayment.enterAmount('60,000')
      await expect(page).toHaveURL(urlData.workingWithRealtors)
    })

    await test.step(`STEP 5 - Click "Go Back" button -> user is placed on Down Payment step`, async () => {
      await steps.workingWithRealtor.footer.goBackButton.click()
      await steps.downPayment.footer.goBackButton.click()
      await expect(page).toHaveURL(urlData.currentCreditProfile)
    })
  })
})
