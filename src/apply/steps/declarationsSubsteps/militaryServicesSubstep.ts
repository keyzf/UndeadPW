import {BasicStep} from '../basicStep'
import {DeclarationsValues} from '.'
import {FooterFragment} from 'src/apply/fragments'
import {MilitaryServices} from 'src/apply/interfaces'
import {MilitaryServicesPage} from 'src/apply/pages'
import {Page, expect} from '@playwright/test'
import {urlData} from 'data/apply'

export class MilitaryServicesSubstep extends BasicStep {
  readonly militaryServicesPage: MilitaryServicesPage
  readonly footer: FooterFragment

  constructor(page: Page) {
    super(page)
    this.footer = new FooterFragment(page)
    this.militaryServicesPage = new MilitaryServicesPage(page)
  }

  public async fillMilitaryServices(data: DeclarationsValues, values?: MilitaryServices) {
    await expect(this.page).toHaveURL(urlData.militaryServices)
    await this.militaryServicesPage.currentlyServingRadiobutton.selectNo()
    await this.footer.continueButton.click()
    if(data === DeclarationsValues.yes) {
      await this.militaryServicesPage.currentlyServingRadiobutton.selectYes()
      switch(values?.militaryParameter) {
        case 'Serving on active': {
          await this.militaryServicesPage.servingActiveDutyCheckbox.check()
          break
        }
        case 'Retired': {
          await this.militaryServicesPage.retiredCheckbox.check()
          break
        }
        case 'Non-activated member': {
          await this.militaryServicesPage.nonActivatedMemberCheckbox.check()
          break
        }
        case 'Surviving Spouse': {
          await this.militaryServicesPage.survivingSpouseCheckbox.check()
          break
        }
      }
      await this.footer.continueButton.click()
    }
  }
}
