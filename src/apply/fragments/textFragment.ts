import {BaseFragment} from './baseFragment'

export class TextFragment extends BaseFragment {
  async getData(): Promise<string | null> {
    return await this.page.locator(<string>this.root).textContent()
  }
}
