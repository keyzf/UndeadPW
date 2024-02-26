import {Locator, Page} from '@playwright/test'

interface GetApplicationProgressFragment {
  text?: string,
  percentage?: string
}

export class ApplicationProgressFragment {
  readonly page: Page
  readonly progress: Locator

  constructor(page: Page) {
    this.page = page
    this.progress = page.locator('[class^="CircleProgressBar__Wrapper"]')
  }

  /**
  * @return {ApplicationProgressData} input data
  */
  async getData(): Promise<GetApplicationProgressFragment> {
    const data = {
      text: '',
      percentage: '',
      color: ''
    }
    data.text = await this.page.locator('[class^="Progressstyles__ProgressWrapper"]').innerText()
    data.percentage = await this.progress.locator('g').textContent() as string
    return data
  }
}
