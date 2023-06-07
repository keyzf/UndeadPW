import { test, expect } from "@playwright/test";
import { cardData } from "../../../../data/apply";
import { Steps } from "../../../../src/apply/po";
import { ApplicationProgressFragment, FooterFragment } from "../../../../src/apply/fragments";
import ENV from "../../../../data/envs/env";

test.describe('Apply', () => {
  test.beforeEach(async ({ page }) => {
    const steps = new Steps(page);
    await steps.typeOfLoan.openApply(ENV.APPLY_URL);
  })

  test('@P2 @apply @purchaseSearching 909_PropertyType_DefaultStateCheck[PurchaseSearching]', async ({ page }) => {
    const steps = new Steps(page);
    const progressFragment = new ApplicationProgressFragment(page);
    const footer = new FooterFragment(page)

    await steps.typeOfLoan.selectTypeOfLoan(cardData.typeOfLoan.REFINANCE);
    //STEP 1
    expect((await steps.propertyType.stepHeader.getData()).text).toEqual('What would you like to do today?')
    //STEP 2
    expect((await progressFragment.getData()).percentage).toEqual('0%');
    //STEP 3
    expect(await footer.continueButton).not.toBeVisible();
  })
})
