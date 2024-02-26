import {InputFragment} from "../fragments";
import {Page} from "@playwright/test";

export class CreditProfilePage {
  readonly socialSecurityNumber: InputFragment;

  constructor(page: Page) {
    this.socialSecurityNumber = new InputFragment(page, '[name*=".socialSecurityNumber"]');
  }
}
