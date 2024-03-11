import {accountsPaths, userCreeds} from 'data/accountsAPI'
import {expect} from '@playwright/test'
import axios from 'axios'
import ENV from 'data/envs/env'

export type TSignInCredentials = {
  clientId: string,
  companyId: string,
  email: string
}

export class AccountsSignIn {
  protected token: string | undefined
  protected clientId: string | undefined

  public async signInCredentials(userData: TSignInCredentials, password: string) {
    const response = await axios.post(ENV.ACCOUNTS + accountsPaths.signIn.credentials, userData, {
      headers: {password: password}
    })
    expect(response.status).toBe(201)
    return response.data
  }

  public async useTokenOf(
    userData: TSignInCredentials = userCreeds.initialUser,
    clientId: string = userCreeds.initialUser.clientId,
    password: string = userCreeds.initialUser.password
  ) {
    if(clientId !== userCreeds.initialUser.clientId){
      userData.clientId = clientId
    }
    const response = await this.signInCredentials(userData, password)
    this.token = response.accessValue.value
    this.clientId = userData.clientId
    return {token: this.token, clientId: this.clientId}
  }
}
