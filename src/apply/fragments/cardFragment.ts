import {Locator, Page} from '@playwright/test'

interface CardData {
  name: string
  disabled: boolean
}

export class CardFragment {
  readonly page: Page
  readonly cardType: Locator
  readonly checkMark: Locator

  constructor(page: Page) {
    this.page = page
    this.cardType = page.locator('label')
    this.checkMark = this.cardType.locator('div[class*="CheckedMarkstyles"]')
  }

  /**
   * @param {string} title - card title
   */
  async selectCard(title: string): Promise<void> {
    await this.cardType.filter({hasText: title}).click()
  }

  /**
   * @param {string} title - card title
   * @return {CardData} card data
   */
  async getData(title: string): Promise<CardData> {
    const cardLocator = this.cardType.filter({hasText: title})
    return {
      name: await cardLocator.innerText(),
      disabled: await cardLocator.isDisabled(),
    }
  }
}
