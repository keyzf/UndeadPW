import {accountsPaths as paths, userCreeds} from '../../data/accountsAPI'
import {expect} from 'fixtures'
import axios, {AxiosResponse} from 'axios'
import ENV from 'data/envs/env'

export type TSignInCredentials = {
  clientId: string;
  companyId: string;
  email: string;
}

export class AccountsSignIn {
  protected token: string | undefined
  protected clientId: string | undefined

  public signInCredentials(userData: TSignInCredentials, password: string): Promise<AxiosResponse> {
    return axios.post(ENV.ACCOUNTS + paths.signIn.credentials, userData, {
      headers: {password: password},
    })
  }

  public useTokenOf(
    userData: TSignInCredentials = userCreeds.initialUser,
    clientId: string = userCreeds.initialUser.clientId,
    password: string = userCreeds.initialUser.password
  ): Promise<{ token: string | undefined; clientId: string }> {
    if (clientId !== userCreeds.initialUser.clientId) {
      userData.clientId = clientId
    }

    return this.signInCredentials(userData, password).then((response) => {
      this.token = response.data.accessValue.value
      this.clientId = userData.clientId
      return {token: this.token, clientId: this.clientId}
    })
  }
}

export class AccountsWhiteLists extends AccountsSignIn {
  public getWhiteLists(
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials): Promise<any> {
    return this.useTokenOf(userData).then(({token, clientId}) => {
      return axios.get(ENV.ACCOUNTS + paths.whiteLists + `?companyId=${companyId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          ClientId: clientId,
        },
      }).then((res) => {
        expect(res.status).toBe(200)
        return res.data
      })
    })
  }

  public addEmailToWhiteLists(
    email: string,
    companyId: string = userCreeds.initialUser.companyId,
    userData?: TSignInCredentials
  ): Promise<any> {
    return this.useTokenOf(userData).then(({token, clientId}) => {
      return axios.post(
        ENV.ACCOUNTS + paths.whiteLists,
        [
          {
            emailAddress: email,
            companyId: companyId,
            type: `Email`,
          },
        ],
        {
          headers: {
            Authorization: 'Bearer ' + token,
            ClientId: clientId,
          },
        }
      ).then((res) => {
        expect(res.status).toBe(201)
        return res.data
      })
    })
  }
}
