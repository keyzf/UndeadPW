import {expect} from '@playwright/test'

import {BaseFragment} from './baseFragment'

export class RadioButtonFragment extends BaseFragment {
  /**
  * @param value - radio button value
  */
  async selectValue(value: string) {
    await this.getLocator().getByText(value, {exact: true}).click()
    expect(await this.getLocator().getByLabel(value, {exact: true}).isChecked()).toBeTruthy()
  }

  /**
  * Select NO
  */
  async selectNo() {
    await this.selectValue('No')
  }

  /**
  * Select YES
  */
  async selectYes() {
    await this.selectValue('Yes')
  }
}
