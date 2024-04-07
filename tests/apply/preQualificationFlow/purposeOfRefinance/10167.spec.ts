import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`@smoke @apply @refinance
    10167_[POS_Application]_PreQual_General_Questions_PurposeOfRefinance_Navigation[Refinance]`,
  async ({steps, page}) => {
    const assertionText = 'Was second mortgage obtained as part of the initial purchase transaction?'

    await steps.typeOfLoan.openApply(ENV.APPLY_URL)
    await test.step('STEP 1 - Go to Property Usage Details step', async () => {
      await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE)
      await steps.propertyType.selectPropertyType(cardData.propertyType.CO_OP)
      await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.INVESTMENT_PROPERTY)
      await steps.propertyAddress.enterAddress(flowData.street)
      await steps.propertyValue.enterPropertyValue(flowData.propertyValue)
      await steps.currentMortgageBalance.enterCurrentMortgageBalance(flowData.currentMortgageBalance)
      await expect(page).toHaveURL(urlData.purposeOfRefinance)
    })

    await test.step('STEP 2 - Select Any Cards', async () => {
      await steps.purposeOfRefinance.selectPurposeOfRefinance(cardData.purposeOfRefinance.LOWER_MONTHLY_PAYMENT)
      await expect(page).toHaveURL(urlData.currentCreditProfile)
    })

    await test.step(`STEP 3 - Click "Go Back" button -> user is placed on "Property Type" step.
        Click "Go Back" button`, async () => {
      await steps.currentCreditProfile.footer.goBackButton.click()
      await steps.purposeOfRefinance.footer.goBackButton.click()
      await expect(page).toHaveURL(urlData.currentMortgageBalance)
    })

    await test.step(`STEP 4 - Click "Continue" button -> user is placed on Purpose of Refinance step
    Select "Consolidate your 1st and 2nd mortgage" card`, async () => {
      await steps.currentMortgageBalance.footer.continueButton.click()
      await steps.purposeOfRefinance
        .selectPurposeOfRefinance(cardData.purposeOfRefinance.CONSOLIDATE_YOUR_1ST_AND_2ND_MORTGAGE)
      const modalText = await steps.purposeOfRefinance.modalFragment.modalText.getData()
      await expect(modalText).toEqual(assertionText)
    })
  })
})
