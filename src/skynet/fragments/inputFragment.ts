import {expect} from '@playwright/test'

import {InputData} from '../../shared'

import {BaseFragment} from './baseFragment'

export class InputFragment extends BaseFragment {
  /**
   * @param value - value to type into input
   * @param clear - need to clear input
   */
  async enterValue(value: string, clear?: boolean): Promise<void> {
    if (clear) {
      await this.getLocator().clear()
      await this.getLocator().fill(value)
    } else {
      await this.getLocator().fill(value)
      await expect(this.getLocator()).not.toBeEmpty()
    }
  }

  /**
   * @return {InputData} input data
   */
  async getData(): Promise<InputData> {
    const value = (await this.getLocator().inputValue()) ?? ''
    const disabled = await this.getLocator().isDisabled()
    return {value, disabled}
  }
}
