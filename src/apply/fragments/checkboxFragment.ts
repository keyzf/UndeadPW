import {expect} from '@playwright/test'
import {BaseFragment} from '.'

export class CheckboxFragment extends BaseFragment {
  /**
   * Toggles the checkbox with the given value.
   * @param value - The value of the checkbox.
   * @returns A promise that resolves when the checkbox is checked.
   */
  async check(value?: string): Promise<void> {
    const locator = value ? this.getLocator().getByText(value) : this.getLocator()
    await locator.scrollIntoViewIfNeeded()
    await locator.click({force: true})
    await expect(await locator).toBeChecked()
  }

  async uncheck(value?: string): Promise<void> {
    if(value) {
      await this.page.getByText(value).uncheck({force: true})
      await this.page.waitForTimeout(1000)
    }
    await this.getLocator().uncheck({force: true})
    await this.page.waitForTimeout(1000)
  }
}
