import {expect} from '@playwright/test'
import axios from 'axios'

import {accountsPaths as paths, userCreeds} from '../../../../../data/accountsAPI'
import ENV from '../../../../../data/envs/env'

import {AccountsSignIn, TSignInCredentials} from './signInAPIHelper'

export class AccountsWhiteLists extends AccountsSignIn {
  public getWhiteLists(companyId: string = userCreeds.initialUser.companyId, userData?: TSignInCredentials) {
    return this.useTokenOf(userData).then(() => {
      return axios.get(ENV.ACCOUNTS + paths.whiteLists + `?companyId=${companyId}`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
      }).then((response) => {
        expect(response.status).toEqual(200)
        return response.data
      })
    })
  }

  public addEmailToWhiteLists(
    email: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    return this.useTokenOf(userData).then(() => {
      return axios.post(ENV.ACCOUNTS + paths.whiteLists, [{
        emailAddress: email,
        companyId: companyId,
        type: 'Email',
      }], {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
      }).then((response) => {
        expect(response.status).toEqual(201)
        return response.data
      })
    })
  }

  public addPhoneToWhiteLists(
    phone: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials,
    clientId: string = userCreeds.initialUser.clientId
  ) {
    return this.useTokenOf(userData, clientId).then(() => {
      return axios.post(ENV.ACCOUNTS + paths.whiteLists, [{
        phoneNumber: phone,
        companyId: companyId,
        type: 'Phone',
      }], {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
      }).then((response) => {
        expect(response.status).toEqual(201)
        return response.data
      })
    })
  }

  public deleteEmailFromWhiteLists(
    email: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    return this.useTokenOf(userData).then(() => {
      return axios.delete(ENV.ACCOUNTS + paths.whiteLists, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
        data: [{
          emailAddress: email,
          companyId: companyId,
          type: 'Email',
        }],
      }).then((response) => {
        expect(response.status).toEqual(204)
        return response.data
      })
    })
  }

  public deletePhoneFromWhiteLists(
    phone: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ) {
    return this.useTokenOf(userData).then(() => {
      return axios.delete(ENV.ACCOUNTS + paths.whiteLists, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
        data: [{
          phoneNumber: phone,
          companyId: companyId,
          type: 'Phone',
        }],
      }).then((response) => {
        expect(response.status).toEqual(204)
        return response.data
      })
    })
  }
}
