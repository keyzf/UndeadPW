import {BaseFragment} from './baseFragment'
import {ButtonData} from '../../shared'
import {expect} from '@playwright/test'

export class ButtonFragment extends BaseFragment {
  /**
   * Clicks the button.
   */
  async click() {
    expect(this.getLocator()).toBeVisible()
    await this.page.click(this.root as string, {delay: 300})
  }

  /**
   * Gets the button data.
   * @returns {ButtonData} Button data.
   */
  async getButtonData(): Promise<ButtonData> {
    return {
      text: await this.page.innerText(this.root as string),
      disabled: await this.page.isDisabled(this.root as string),
    }
  }
}
