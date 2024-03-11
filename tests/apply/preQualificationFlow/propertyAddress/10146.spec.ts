import {ApplicationFlow} from 'src/apply/po'
import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {Flow} from 'src/apply/interfaces'
import {generateTestUser} from 'helpers/common/helper'

test.describe('Apply', () => {
  test.beforeEach(async ({steps, page}) => {
    const applicationFlow = new ApplicationFlow(page)
    await applicationFlow.applicationFlow.setFlow(Flow.purchase, generateTestUser())

    await expect(page).toHaveURL(urlData.fullPersonalInfo)
    await steps.typeOfLoan.openDashboard()
    await steps.typeOfLoan.startNewApplication()
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
    await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
    await steps.purchaseProcessType
      .selectPurchaseProcessType(cardData.purchaseProcessType.ALREADY_SIGNED_A_PURCHASE_CONTRACT)
    await steps.propertyType.selectPropertyType(cardData.propertyType.CONDO)
    await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
  })

  test('@P1 @apply @purchase 10146_PropertyAddress_UniqueSubjectPropertyAddress_Navigation[PurchaseSignedContract]',
    async ({steps, page}) => {
      await test.step(`STEP 1 - Verify that user can return to the previous step by clicking "Go Back" button`,
        async () => {
          await steps.propertyAddress.footer.goBackButton.click()
          await expect(page).toHaveURL(urlData.propertyUsageDetails)
        })

      await test.step(`STEP 2 - Enter unique valid data only into required fields:- Street Address`,
        async () => {
          await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
          await steps.propertyAddress.enterAddress(flowData.street)
          await expect(page).toHaveURL(urlData.purchasePrice)
        })

      await test.step(`STEP 3 - Enter unique valid data only into required fields:- Street Address`,
        async () => {
          await steps.purchasePrice.footer.goBackButton.click()
          await steps.propertyAddress.address.cityInput.enterValue(flowData.purchaseAddress.city)
          await steps.propertyAddress.address.cityInput.enterValue(flowData.purchaseAddress.zipCode)
        })
    })
})
