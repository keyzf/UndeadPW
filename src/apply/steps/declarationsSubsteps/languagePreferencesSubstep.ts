import {BasicStep} from '../basicStep'
import {FooterFragment} from 'src/apply/fragments'
import {LanguagePreferencesPage} from 'src/apply/pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class LanguagePreferencesSubstep extends BasicStep {
  readonly footer: FooterFragment
  readonly languagePreferencesPage: LanguagePreferencesPage

  constructor(page: Page) {
    super(page)
    this.footer = new FooterFragment(page)
    this.languagePreferencesPage = new LanguagePreferencesPage(page)
  }

  public async fillLanguagePreferences(value?: string) {
    await expect(this.page).toHaveURL(urlData.languagePreferences)
    if(value) {
      await this.languagePreferencesPage.languageRadiobutton.selectValue(value)
      await this.footer.continueButton.click()
    }
    await this.footer.continueButton.click()
  }
}
