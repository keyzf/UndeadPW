import {test, expect} from '@playwright/test';
import {CardFragment, AddressFragment, InputFragment} from '../../src/apply/fragments';
import {cardData} from '../../data/apply';
import ENV from '../../data/envs/env';

test('Apply Test', async ({ page, context }) => {
    const card = new CardFragment(page);
    const address = new AddressFragment(page);

    await page.goto(ENV.APPLY_URL);
    await expect(page).toHaveURL(/.*applications/);

    await card.selectCard(cardData.typeOfLoan.REFINANCE);
    await card.selectCard(cardData.propertyType.TOWNHOUSE);
    await card.selectCard(cardData.propertyUsageDetails.SECOND_HOME);

    await expect(page).toHaveURL(/.*property-address/);

    await address.enterAddress({address: '950 22nd St N Birmingham, AL, USA'});
    await page.waitForTimeout(500);
    await page.getByText('Continue').click();
    await expect(page).toHaveURL(/.*property-value/);
})
