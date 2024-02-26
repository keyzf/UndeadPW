import {BaseFragment} from './baseFragment'

export class DropdownFragment extends BaseFragment {
  /**
   * @param value - value to type into input
   */
  async selectValue(value: string) {
    await this.getLocator().click()
    await this.page.locator('[class^="Selectstyles__OptionLabelWrapper"]').getByText(value, {exact: true}).click()
  }
}
