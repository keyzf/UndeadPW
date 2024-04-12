import {purchaseFlowData, urlData} from 'data/apply'
import {expect, test} from 'fixtures'
import {Flow} from 'src/apply/interfaces'
import {generateTestUser} from 'helpers/common/helper'

test.describe('Apply', () => {
  test(`9005_PropertyInformation_Navigation_NoOtherPayments[PurchaseSearching]`, 
    {tag: ['@P1', '@apply', '@purchase']}, async ({steps, applicationFlow, page}) => {
      const testData = {
        propertyDetails: {
          typeOfProperty: 'Multi-Unit',
          attachmentType: 'Attached',
          numberOfUnits: '2'
        },
        taxesInsurance: {
          escrowing: 'No',
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

      await test.step(`STEP 5 - Complete Property section and click on "Continue" button`, async () => {
        await steps.propertyInformation.fillPropertyInformation(testData)
        await expect(page).toHaveURL(urlData.titleHolder)
      })
    })
})
