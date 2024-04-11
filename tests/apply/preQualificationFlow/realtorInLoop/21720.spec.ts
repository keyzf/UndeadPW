import {cardData, flowData, realtorData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`21720_[POS_Application]_PreQual_Realtors_RealtorInfo_WithRealtorRole_OnlyRequiredFields[PurchaseSearching]`, 
    {tag: ['@smoke', '@apply', '@purchase']}, async ({steps, page}) => {
      const testData = {
        firstName: realtorData.firstName,
        lastName: realtorData.lastName,
        email: realtorData.email,
        mobileNumber: realtorData.phoneNumber,
        share: true
      }
    
      await steps.typeOfLoan.openApply(ENV.APPLY_URL)

      await test.step(`STEP 1 - Go to Realtor Info Step`, async () => {
        await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE)
        await steps.firstTimeBuyer.selectFirstTimeBuyer(cardData.firstTimeBuyer.YES)
        await steps.purchaseProcessType
          .selectPurchaseProcessType(cardData.purchaseProcessType.SEARCHING_OR_SHOPPING_AROUND)
        await steps.propertyType.selectPropertyType(cardData.propertyType.SINGLE_FAMILY)
        await steps.propertyUsageDetails.selectPropertyUsageDetails(cardData.propertyUsageDetails.PRIMARY_RESIDENCE)
        await steps.purchaseLocation.enterAddress(flowData.purchaseAddress.zipCode)
        await steps.budget.enterAmount(flowData.propertyValue)
        await steps.currentCreditProfile.selectCurrentCreditProfile(cardData.currentCreditProfile.EXCELLENT)
        await steps.downPayment.enterAmount(flowData.downPayment)
        await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.YES)
        await steps.realtorInLoop.selectRealtorInLoop(cardData.realtorInLoop.YES)
        await expect(page).toHaveURL(urlData.realtorInfo)
      })

      await test.step(`STEP 2 - Enter valid data about realtor into`, async () => {
        await steps.realtorInfo.enterRealtorInfoData(testData)
        await expect(page).toHaveURL(urlData.personalInfo)
      })

      await test.step(`STEP 3 - Click "Go Back" button -> user is placed on Realtor Info step`, async () => {
        await steps.personalInfo.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.realtorInfo)
        await expect(steps.realtorInfo.realtorInfoPage.firstNameInput.getLocator().textContent).not.toBeNull()
        await expect(steps.realtorInfo.realtorInfoPage.lastNameInput.getLocator().textContent).not.toBeNull()
        await expect(steps.realtorInfo.realtorInfoPage.emailInput.getLocator().textContent).not.toBeNull()
        await expect(steps.realtorInfo.realtorInfoPage.mobileNumberInput.getLocator().textContent).not.toBeNull()
      })

      await test.step(`STEP 4 - Click "Go Back" button`, async () => {
        await steps.realtorInfo.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.realtorInLoop)
      })
    })
})
