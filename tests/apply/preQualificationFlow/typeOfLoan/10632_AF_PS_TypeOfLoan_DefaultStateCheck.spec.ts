import {test, expect} from "@playwright/test";
import {Steps} from "../../../../src/apply/po";
import {ApplicationProgressFragment} from "../../../../src/apply/fragments";
import ENV from "../../../../data/envs/env";

test.describe('Apply', () => {
  test.beforeEach(async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.openApply(ENV.APPLY_URL);
  })

  test('@P1 @apply @purchaseSearching 907_TypeOfLoan_Navigation[PurchaseSearching]', async ({ page }) => {
    const progressFragment = new ApplicationProgressFragment(page);
    //STEP 1
    expect((await progressFragment.getData()).percentage).toEqual('0%');
    //STEP 2
    expect((await progressFragment.getData()).text).toEqual('Application Progress');
    //STEP 3
    page.locator('[data-testid="footer__nextButton"]').isHidden()
  })
})
