import {BasicStep} from './basicStep'
import {Page, expect, test} from '@playwright/test'
import {TextFragment} from '../fragments/'
import {urlData} from 'data/apply'

export class FinalRateComparisonStep extends BasicStep {
  private readonly rateComparisonErrorElement: TextFragment
  readonly programElement: string
  readonly rateElement: string

  constructor(page: Page) {
    super(page)
    this.rateComparisonErrorElement = new TextFragment(this.page, '[class*="errorText__ErrorText"]')
    this.rateElement = '[class*="TermTabstyles__Tab"]'
    this.programElement = '[class*="ProgramCardstyles__Card"]'
  }

  public async chooseRateComparison(rate?: string, program?: string) {
    await expect(this.page).toHaveURL(urlData.finalRateComparison)
    await this.page.waitForSelector('[class*="Carousel__ContentWrapper"]', {state: 'visible'})
    await test.step(`Choose Rate Comparison - ${rate || 'default'}`, async () => {
      await this.page.waitForSelector(this.rateElement, {state: 'visible'})
      if(rate) {
        await this.page.getByRole('button', {name: `${rate}`}).click({force: true})
      }
      await this.page.locator(this.rateElement).first().click({force: true})
      await this.footer.continueButton.click()
    })
  }

  public async chooseProgram(program?: string) {
    await test.step(`Choose Program - ${program}`, async () => {
      if (program) {
        await this.page.waitForSelector(this.rateElement, {state: 'visible'})
        await this.page.locator('#RateComparison div').filter({hasText: program}).nth(1).click()
      }
      await this.page.waitForSelector(this.rateElement, {state: 'visible'})
      await this.page.locator(this.programElement).first().click()
    })
  }

  public getRateComparisonError(): TextFragment {
    return this.rateComparisonErrorElement
  }
}
