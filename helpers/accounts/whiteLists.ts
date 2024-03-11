import {accountsPaths, userCreeds} from 'data/accountsAPI'
import {AccountsSignIn, TSignInCredentials} from './signIn'
import {expect} from 'src/apply/fixtures/fixtures'
import axios from 'axios'
import ENV from 'data/envs/env'

export class AccountsWhiteLists extends AccountsSignIn {
  public async getWhiteLists(companyId: string = userCreeds.initialUser.companyId, userData?: TSignInCredentials) {
    await this.useTokenOf(userData)
    const response = await axios.get(ENV.ACCOUNTS + accountsPaths.whiteLists + `?companyId=${companyId}`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        ClientId: this.clientId
      }
    })
    expect(response.status).toBe(200)
    return response.data
  }

  public async addEmailToWhiteLists(
    email: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    await this.useTokenOf(userData).then(async () => {
      const response = await axios({
        method: 'POST',
        url: ENV.ACCOUNTS + accountsPaths.whiteLists,
        data: [{
          phoneNumber: email,
          companyId: companyId,
          type: `Email`
        }],
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId
        }
      })
      expect(response.status).toBe(201)
      return response.data
    })
  }

  public async addPhoneToWhiteLists(
    phone: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials,
    clientId: string = userCreeds.initialUser.clientId
  ) {
    await this.useTokenOf(userData, clientId).then(async () => {
      const response = await axios({
        method: 'POST',
        url: ENV.ACCOUNTS + accountsPaths.whiteLists,
        data: [{
          phoneNumber: phone,
          companyId: companyId,
          type: `Phone`
        }],
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId
        }
      })
      expect(response.status).toBe(201)
      return response.data
    })
  }

  public async deleteEmailFromWhiteLists(
    email: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    await this.useTokenOf(userData).then(async () => {
      const response = await axios({
        method: 'DELETE',
        url: ENV.ACCOUNTS + accountsPaths.whiteLists,
        data: [{
          phoneNumber: email,
          companyId: companyId,
          type: `Email`
        }],
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId
        }
      })
      expect(response.status).toBe(204)
      return response.data
    })
  }

  public async deletePhoneFromWhiteLists(
    phone: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    await this.useTokenOf(userData).then(async () => {
      const response = await axios({
        method: 'DELETE',
        url: ENV.ACCOUNTS + accountsPaths.whiteLists,
        data: [{
          phoneNumber: phone,
          companyId: companyId,
          type: `Phone`
        }],
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId
        }
      })
      expect(response.status).toBe(204)
      return response.data
    })
  }
}
