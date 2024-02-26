import {Page} from '@playwright/test'
import {RadioButtonFragment} from 'src/apply/fragments'

export class LanguagePreferencesPage {
  readonly languageRadiobutton: RadioButtonFragment

  constructor(page: Page) {
    this.languageRadiobutton = new RadioButtonFragment(page, '[data-testid="languagePreferenceRadioGroup__component"]')
  }
}
