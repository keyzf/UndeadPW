/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {Page} from '@playwright/test'
import {BasicStep} from './basicStep'
import {
  DeclarationsValues,
  DemographicInformationSubstep,
  FinancesSubstep,
  HomeownershipEducationHousingCounselingSubstep,
  LanguagePreferencesSubstep,
  MilitaryServicesSubstep,
  PropertyOfLoanSubstep,
} from './declarationsSubsteps'

export class DeclarationsStep extends BasicStep {
  readonly demographicInformationSubstep: DemographicInformationSubstep
  readonly financesSubstep: FinancesSubstep
  readonly homeownershipEducationHousingCounselingSubstep: HomeownershipEducationHousingCounselingSubstep
  readonly languagePreferencesSubstep: LanguagePreferencesSubstep
  readonly militaryServicesSubstep: MilitaryServicesSubstep
  readonly propertyOfLoanSubstep: PropertyOfLoanSubstep

  constructor(page: Page) {
    super(page)
    this.demographicInformationSubstep = new DemographicInformationSubstep(page)
    this.financesSubstep = new FinancesSubstep(page)
    this.homeownershipEducationHousingCounselingSubstep = new HomeownershipEducationHousingCounselingSubstep(page)
    this.languagePreferencesSubstep = new LanguagePreferencesSubstep(page)
    this.militaryServicesSubstep = new MilitaryServicesSubstep(page)
    this.propertyOfLoanSubstep = new PropertyOfLoanSubstep(page)
  }

  public async fillDeclarations(value: DeclarationsValues, count = 1, data?: unknown) {
    await this.propertyOfLoanSubstep.fillPropertyOfLoan(value, data!)
    await this.financesSubstep.fillFinances(value, data!)
    await this.militaryServicesSubstep.fillMilitaryServices(value)
    await this.homeownershipEducationHousingCounselingSubstep.fillHomeownershipEducationHousingCounseling(value)
    await this.languagePreferencesSubstep.fillLanguagePreferences()
    await this.demographicInformationSubstep.fillDemographic()
  }
}
