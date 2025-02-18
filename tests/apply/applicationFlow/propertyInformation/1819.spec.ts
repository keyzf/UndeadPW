import {expect, test} from 'fixtures'
import {Flow} from 'src/apply/interfaces'
import {purchaseFlowData, urlData} from 'data/apply'
import {generateTestUser} from 'helpers/common/helper'

test.describe('Apply', () => {
  test(`1819_[POS_Application]_Property_Information_Navigation_OnlyRequiredFields[PurchaseSearching]`,
    {tag: ['@smoke', '@apply', '@purchase']}, async ({steps, applicationFlow, page}) => {
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

      await applicationFlow.applicationFlow.setFlow(Flow.purchase, generateTestUser())
      await steps.fullPersonalInfo.fillFullPersonalInfo(purchaseFlowData.fullPersonalInfo)

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
