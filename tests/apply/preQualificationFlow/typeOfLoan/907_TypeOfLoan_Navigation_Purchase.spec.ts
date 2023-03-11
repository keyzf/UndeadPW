import {test, expect} from "@playwright/test";
import {cardData} from "../../../../data/apply";
import {Steps} from "../../../../src/apply/po";
import ENV from "../../../../data/envs/env";

test.describe('Apply', () => {
  test.beforeEach(async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.openApply(ENV.APPLY_URL);
  })

  test('@P1 @apply @purchaseSearching 907_TypeOfLoan_Navigation[PurchaseSearching]', async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.PURCHASE);
    await expect(page).toHaveURL(/.*first-time-home-buyer/);
  })
})