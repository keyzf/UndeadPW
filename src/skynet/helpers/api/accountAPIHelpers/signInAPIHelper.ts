import {accountsPaths as paths, userCreeds} from '../../../../../data/accountsAPI'
import axios, {AxiosResponse} from 'axios'
import ENV from '../../../../../data/envs/env'

export type TSignInCredentials = {
  clientId: string;
  companyId: string;
  email: string;
};

export class AccountsSignIn {
  protected token: string | undefined
  protected clientId: string | undefined

  public async signInCredentials(userData: TSignInCredentials, password: string):
    Promise<{ accessValue: { value: string } }> {
    const response: AxiosResponse<{ accessValue: { value: string } }> = await axios.post(
      ENV.ACCOUNTS + paths.signIn.credentials,
      userData,
      {headers: {password: password}}
    )
    return response.data
  }

  public async useTokenOf(
    userData: TSignInCredentials = userCreeds.initialUser,
    clientId: string = userCreeds.initialUser.clientId,
    password: string = userCreeds.initialUser.password
  ): Promise<{ token: string; clientId: string }> {
    if (clientId !== userCreeds.initialUser.clientId) {
      userData.clientId = clientId
    }
    const response = await this.signInCredentials(userData, password)
    this.token = response.accessValue.value
    this.clientId = userData.clientId
    return {token: this.token, clientId: this.clientId}
  }
}
