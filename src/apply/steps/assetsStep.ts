import {Assets, AssetsData} from '../interfaces'
import {AssetsPage} from '../pages'
import {BasicStep} from './basicStep'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class AssetsStep extends BasicStep {
  assets: AssetsPage

  constructor(page: Page) {
    super(page)
    this.assets = new AssetsPage(page)
  }

  async fillAssetsData(data: AssetsData) {
    await this.assets.assetTypeDropdown.selectValue(data.assetType)
    if(data.assetType === 'Checking' || data.assetType === 'Savings') {
      await this.assets.depositorInstitutionInput.enterValue(data.depositorInstitution as string)
      await this.assets.accountNumberInput.enterValue(data.accountNumber as string)
      await this.assets.valueInput.enterValue(data.value as string)
    } else if(data.assetType === 'Gift') {
      await this.assets.gifterNameInput.enterValue(data.gifterName as string)
      await this.assets.relationshipDropdown.selectValue(data.relationship as string)
      await this.assets.amountInput.enterValue(data.amount as string)
      await this.assets.depositedRadiobutton.selectValue(data.deposited as string)
    } else {
      await this.assets.valueInput.enterValue(data.value as string)
    }
  }

  async fillAssets(data: Assets) {
    await expect(this.page).toHaveURL(urlData.assets)
    await this.assets.assetRadiobutton.selectValue(data.hasAsset)

    if(data.hasAsset === 'Yes') {
      await this.assets.manualVerificationButton.click()
      await this.fillAssetsData(data.assetsData as AssetsData)
    }

    await this.footer.continueButton.click()
  }
}
