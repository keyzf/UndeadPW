import {expect, FullConfig, Page} from "@playwright/test";
import ENV from "../../../data/envs/env";

export class BasicStep {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openApply(env: string) {
    //Set apply domain (when domain = company)
    await this.page.addInitScript(()=>{
        window.indexedDB.deleteDatabase('localforage');
        window.localStorage.clear();
        window.localStorage.setItem('interfirstApply.changedDomainName', 'aqa-skynet.cyberdynemortgage.com');
    });
    await this.page.goto(env);
    await expect(this.page).toHaveURL(/.*applications/);
  }
}
