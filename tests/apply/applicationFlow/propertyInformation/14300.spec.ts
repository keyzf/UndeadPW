import {expect, test} from 'fixtures'
import {Flow} from 'src/apply/interfaces'
import {generateTestUser} from 'helpers/common/helper'
import {refinanceFlowData, urlData} from 'data/apply'

test.describe('Apply', () => {
  test(`14300_[POS_Application]_Property_Information_Navigation_OnlyRequiredFields[Refinance]`,
    {tag: ['@smoke', '@apply', '@refinance']}, async ({steps, applicationFlow, page}) => {
      await applicationFlow.applicationFlow.setFlow(Flow.refinance, generateTestUser())
      await steps.fullPersonalInfo.fillFullPersonalInfo(refinanceFlowData.fullPersonalInfo)

      await test.step(`STEP 1 - 2 - Enter valid data only into required fields`, async () => {
        await steps.propertyInformation.fillPropertyInformation(refinanceFlowData.propertyInformation)
        await expect(page).toHaveURL(urlData.titleHolder)
      })

      await test.step(`STEP 4 - Click "Go Back" button`, async () => {
        await steps.titleHolder.footer.goBackButton.click()
        await steps.propertyInformation.footer.goBackButton.click()
        await expect(page).toHaveURL(urlData.fullPersonalInfo)
      })
    })
})
