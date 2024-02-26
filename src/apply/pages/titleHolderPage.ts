import {Page} from '@playwright/test'

import {ButtonFragment, DropdownFragment, InputFragment, RadioButtonFragment} from '../fragments'

export class TitleHolderPage {
  readonly addMoreButton: ButtonFragment
  readonly cellPhoneNumberInput: InputFragment
  readonly emailAddressInput: InputFragment
  readonly firstNameInput: InputFragment
  readonly lastNameInput: InputFragment
  readonly mannerHeldDropdown: DropdownFragment
  readonly middleNameInput: InputFragment
  readonly removeButton: ButtonFragment
  readonly suffixDropdown: DropdownFragment
  readonly titleHolderRadiobutton: RadioButtonFragment

  constructor(page: Page) {
    this.firstNameInput = new InputFragment(page, '[name*=".firstName"]')
    this.middleNameInput = new InputFragment(page, '[name*=".middleName"]')
    this.lastNameInput = new InputFragment(page, '[name*=".lastName"]')
    this.suffixDropdown = new DropdownFragment(page, '[id*=".suffix"]')
    this.emailAddressInput = new InputFragment(page, '[name*=".email"]')
    this.cellPhoneNumberInput = new InputFragment(page, '[name*=".cellPhoneNumber"]')
    this.removeButton = new ButtonFragment(page, '[data-testid*="deleteTitleHolderButton"]')
    this.addMoreButton = new ButtonFragment(page, '[data-testid="add-button"]')
    this.mannerHeldDropdown = new DropdownFragment(page, '[id*="mannerHeld"]')

    this.titleHolderRadiobutton = new RadioButtonFragment(page, '[data-testid="isTitleHoldersRadioGroup__component"]')
  }
}
