import {ButtonData} from '../../shared'

import {BaseFragment} from './baseFragment'

export class ButtonFragment extends BaseFragment {
  /**
   * Clicks the button.
   */
  async click() {
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
