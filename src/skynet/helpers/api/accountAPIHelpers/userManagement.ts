import {expect} from '@playwright/test'
import axios, {AxiosResponse} from 'axios'

import {accountsPaths as paths, userCreeds} from '../../../../../data/accountsAPI'
import ENV from '../../../../../data/envs/env'

import {AccountsSignIn, TSignInCredentials} from './signInAPIHelper'

type TUserManagement = {
  emailAddress?: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber?: string;
};

type TRoleAssignments = {
  roleName: string;
  type: string;
  userId: string;
};

export class UserManagement extends AccountsSignIn {
  public async updateUserManagement(
    companyId: string = userCreeds.initialUser.companyId,
    userId: string,
    data: TUserManagement,
    userData?: TSignInCredentials
  ): Promise<unknown> {
    await this.useTokenOf(userData)
    const response: AxiosResponse = await axios.put(
      ENV.ACCOUNTS + paths.userManagement(companyId, userId),
      data,
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data
  }

  public async roleAssignments(
    companyId: string = userCreeds.initialUser.companyId,
    data: TRoleAssignments,
    userData?: TSignInCredentials
  ): Promise<unknown> {
    await this.useTokenOf(userData)
    const response: AxiosResponse = await axios.post(
      ENV.ACCOUNTS + paths.roleAssignments(companyId),
      [data],
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
          ClientId: this.clientId,
        },
      }
    )
    expect(response.status).toEqual(201)
    return response.data
  }
}
