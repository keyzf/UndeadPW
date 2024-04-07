import {BaseFragment} from './baseFragment'
import {expect} from '@playwright/test'
import {InputData} from '../../shared'

export class InputFragment extends BaseFragment {
  /**
   * @param value - value to type into input
   * @param clear - need to clear input
   */
  async enterValue(value: string, clear?: boolean): Promise<void> {
    expect(await this.getLocator()).toBeVisible()
    if (clear) {
      await this.getLocator().clear()
      await this.getLocator().fill(value)
      await expect(this.getLocator()).not.toBeEmpty()
    } else {
      await this.getLocator().fill(value)
      await expect(this.getLocator()).not.toBeEmpty()
    }
  }

  /**
   * @return {InputData} input data
   */
  async getData(): Promise<InputData> {
    expect(await this.getLocator()).toBeVisible()
    const value = (await this.getLocator().inputValue()) ?? ''
    const disabled = await this.getLocator().isDisabled()
    return {value, disabled}
  }
}
