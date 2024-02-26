import {ButtonFragment, DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'
import {Page} from '@playwright/test'

export class AssetsPage {
  readonly assetRadiobutton: RadioButtonFragment
  readonly manualVerificationButton: ButtonFragment
  readonly assetTypeDropdown: DropdownFragment
  readonly depositorInstitutionInput: InputFragment
  readonly accountNumberInput: InputFragment
  readonly valueInput: InputFragment
  readonly gifterNameInput: InputFragment
  readonly relationshipDropdown: DropdownFragment
  readonly amountInput: InputFragment
  readonly depositedRadiobutton: RadioButtonFragment

  constructor(page: Page) {
    this.assetRadiobutton = new RadioButtonFragment(page, '[data-testid="hasAssetsRadioGroup__component"]')
    this.manualVerificationButton = new ButtonFragment(page, '[aria-label="add one more asset"]')

    this.assetTypeDropdown = new DropdownFragment(page, '[id*=".type"]')
    this.depositorInstitutionInput = new InputFragment(page, '[name*=".financialInstitution"]')
    this.accountNumberInput = new InputFragment(page, '[name*=".accountNumber"]')
    this.valueInput = new InputFragment(page, '[name*=".cashOrMarketValue"]')
    this.gifterNameInput = new InputFragment(page, '[name*=".gifterName"]')
    this.relationshipDropdown = new DropdownFragment(page, '[id*=".relationship"]')
    this.amountInput = new InputFragment(page, '[name*=".cashOrMarketValue"]')
    this.depositedRadiobutton = new RadioButtonFragment(page, '[data-testid*=".isDepositedRadioGroup__component"]')
  }
}
