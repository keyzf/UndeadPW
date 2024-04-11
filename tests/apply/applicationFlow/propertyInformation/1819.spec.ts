import {cardData, flowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import ENV from 'data/envs/env'

test.describe('Apply', () => {
  test(`1819_[POS_Application]_Property_Information_Navigation_OnlyRequiredFields[PurchaseSearching]`,
    {tag: ['@smoke', '@apply', '@purchase']},
    async ({steps, loginModal, page}) => {
      const testData = {
        propertyDetails: {
          typeOfProperty: 'Condo',
          attachmentType: 'Detached',
        },
        taxesInsurance: {
          escrowing: 'Yes',
          annualProperty: '4000',
          homeownersInsurance: '2000'
        },
        homeownerAssociation: {
          homeownersAssociation: 'No'
        },
        rentalIncome: {
          rentalIncome: 'No'
        }
      }

      await steps.typeOfLoan.openApply(ENV.APPLY_URL)
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
      await steps.workingWithRealtor.selectWorkingWithRealtor(cardData.workingWithRealtor.NO)
      await steps.personalInfo.fillPersonalInfoStep(flowData.personalInfo)
      await loginModal.geVerificationCode()
      await steps.rateComparison.chooseRateComparison()
      await steps.fullPersonalInfo.fillFullPersonalInfo(flowData.fullPersonalInfo)

      await test.step(`STEP 1 - 2 - Enter valid data only into required fields`, async () => {
        await steps.propertyInformation.fillPropertyInformation(testData)
        await expect(page).toHaveURL(urlData.titleHolder)
      })
  
      await test.step(`STEP 4 - Click "Go Back" button`, async () => {
        await steps.titleHolder.footer.goBackButton.click()
        await steps.propertyInformation.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.fullPersonalInfo)
      })
    })
})
