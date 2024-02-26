import {Page} from '@playwright/test'

import {DropdownFragment, InputFragment} from '../fragments'

export class FullPersonalInfoPage {
  ageDependentsInput: (age: string) => InputFragment
  cellPhoneNumberInput: InputFragment
  citizenshipStatusDropdown: DropdownFragment
  dateOfBirthInput: InputFragment
  emailInput: InputFragment
  firstNameInput: InputFragment
  homeNumberInput: InputFragment
  lastNameInput: InputFragment
  maritalStatusDropdown: DropdownFragment
  middleNameInput: InputFragment
  numberOfDependentsDropdown: DropdownFragment
  socialSecurityInput: InputFragment
  suffixDropdown: DropdownFragment
  workNumberInput: InputFragment

  constructor(page: Page) {
    // Your Name block
    this.firstNameInput = new InputFragment(page, '[data-testid="personalInfoPart__firstNameInput"]')
    this.middleNameInput = new InputFragment(page, '[data-testid="personalInfoPart__middleNameInput"]')
    this.lastNameInput = new InputFragment(page, '[data-testid="personalInfoPart__lastNameInput"]')
    this.suffixDropdown = new DropdownFragment(page, '[data-testid="personalInfoPart__suffixSelect"]')

    // Your Contact Information block
    this.emailInput = new InputFragment(page, '[data-testid="personalInfoPart__emailInput"]')
    this.cellPhoneNumberInput = new InputFragment(page, '[data-testid="personalInfoPart__cellPhoneNumberInput"]')
    this.homeNumberInput = new InputFragment(page, '[data-testid="personalInfoPart__homePhoneNumberInput"]')
    this.workNumberInput = new InputFragment(page, '[data-testid="personalInfoPart__workPhoneNumberInput"]')

    // Additional Information block
    this.dateOfBirthInput = new InputFragment(page, '[data-testid="personalInfoPart__dateOfBirth"]')
    this.maritalStatusDropdown = new DropdownFragment(page, '[data-testid="personalInfoPart__maritalStatusSelect"]')
    this.socialSecurityInput = new InputFragment(page, '[name="borrowers[0].socialSecurityNumber"]')
    this.citizenshipStatusDropdown =
      new DropdownFragment(page, '[data-testid="personalInfoPart__citizenshipStatusSelect"]')
    this.numberOfDependentsDropdown =
      new DropdownFragment(page, '[data-testid="personalInfoPart__numberOfDependentsSelect"]')
    this.ageDependentsInput = (age: string) =>
      new InputFragment(page, `[name="borrowers[0].ageOfDependents.${age}"]`)
  }
}
