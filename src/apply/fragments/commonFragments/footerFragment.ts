import {Locator, Page} from '@playwright/test';
import {ButtonFragment} from '../buttonFragment';

export class FooterFragment extends ButtonFragment {
  readonly page: Page;
  readonly root: string;
  readonly continueButton: Locator;
  readonly goBackButton: Locator;

  constructor(page: Page) {
    super(page, 'footer');
    this.page = page;
    this.root = 'footer';
    this.continueButton = this.page.locator(this.root).locator('[data-testid="footer__nextButton"]');
    this.goBackButton = this.page.locator(this.root).locator('[data-testid="footer__goBackButton"]');
  }
}
