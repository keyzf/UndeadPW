import {accountsPaths as paths, userCreeds} from '../../data/accountsAPI'
import {AccountsSignIn, TSignInCredentials} from './signIn'
import {expect} from 'fixtures'
import axios from 'axios'
import ENV from 'data/envs/env'

export class AccountsWhiteLists extends AccountsSignIn {
  private buildUrl(path: string, queryParams: Record<string, string | undefined>): string {
    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return ENV.ACCOUNTS + path + (queryString ? `?${queryString}` : '')
  }

  private async makeRequest(method: string, path: string, data: any): Promise<any> {
    const url = this.buildUrl(path, {companyId: userCreeds.initialUser.companyId})
    const headers = {
      Authorization: 'Bearer ' + this.token,
      ClientId: this.clientId,
    }
    const response = await axios({
      method,
      url,
      headers,
      data,
    })
    return response.data
  }

  public async getWhiteLists(
      companyId: string = userCreeds.initialUser.companyId,
      userData?: TSignInCredentials): Promise<any> {
    await this.useTokenOf(userData)
    const response = await this.makeRequest('GET', paths.whiteLists, {})
    expect(response.status).toBe(200)
    return response.body
  }

  public async addEmailToWhiteLists(
      email: string,
      companyId: string = userCreeds.initialUser.companyId,
      userData?: TSignInCredentials): Promise<any> {
    await this.useTokenOf(userData)
    const data = [{emailAddress: email, companyId, type: 'Email'}]
    const response = await this.makeRequest('POST', paths.whiteLists, data)
    expect(response.status).toBe(201)
    return response.body
  }

  public async addPhoneToWhiteLists(
      phone: string,
      companyId: string = userCreeds.initialUser.companyId,
      userData?: TSignInCredentials,
      clientId: string = userCreeds.initialUser.clientId): Promise<any> {
    await this.useTokenOf(userData, clientId)
    const data = [{phoneNumber: phone, companyId, type: 'Phone'}]
    const response = await this.makeRequest('POST', paths.whiteLists, data)
    expect(response.status).toBe(201)
    return response.body
  }

  public async deleteEmailFromWhiteLists(
      email: string,
      companyId: string = userCreeds.initialUser.companyId,
      userData?: TSignInCredentials): Promise<any> {
    await this.useTokenOf(userData)
    const data = [{emailAddress: email, companyId, type: 'Email'}]
    const response = await this.makeRequest('DELETE', paths.whiteLists, data)
    expect(response.status).toBe(204)
    return response.body
  }

  public async deletePhoneFromWhiteLists(
      phone: string,
      companyId: string = userCreeds.initialUser.companyId,
      userData?: TSignInCredentials): Promise<any> {
    await this.useTokenOf(userData)
    const data = [{phoneNumber: phone, companyId, type: 'Phone'}]
    const response = await this.makeRequest('DELETE', paths.whiteLists, data)
    expect(response.status).toBe(204)
    return response.body
  }
}
