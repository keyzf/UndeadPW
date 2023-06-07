import {test, expect} from "@playwright/test";
import {cardData} from "../../../../data/apply";
import {Steps} from "../../../../src/apply/po";
import ENV from "../../../../data/envs/env";

test.describe('Apply', () => {
  test.beforeEach(async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.openApply(ENV.APPLY_URL);
  })

  test('@P1 @apply @purchaseSearching 10768_TypeOfLoan_Navigation[Refinance]', async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE);
    await expect(page).toHaveURL(/.*property-type/);
  })
})
