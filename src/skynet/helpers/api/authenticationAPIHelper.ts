import {AccountsSignIn} from 'helpers/accounts'
import {paths, userData} from 'data/skynet'
import axios, {AxiosResponse} from 'axios'
import ENV from '../../../../data/envs/env'

type TLoginUserData = {
  email: string;
  password: string;
  domain: string;
  clientId: string;
  companyId: string;
};

export class AuthenticationAPIHelper {
  protected token: string | undefined

  constructor() {}

  public async getToken(email: string, password: string, domain: string): Promise<string> {
    const response: AxiosResponse<{ token: string }> = await axios.post(
      `${ENV.SKYNET_API}${paths.authentication.authenticationLogin}`,
      {
        email,
        password,
        isHubspotSession: false,
      },
      {
        headers: {
          domainname: domain,
        },
      }
    )
    return response.data.token
  }

  public async useTokenOf(user: TLoginUserData = userData): Promise<void> {
    const accounts = new AccountsSignIn()
    const response = await accounts.signInCredentials(user, user.password)
    this.token = response.accessValue.value
  }
}
