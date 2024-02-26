import {expect} from '@playwright/test'
import axios, {AxiosResponse} from 'axios'

import {accountsPaths as paths} from '../../../../../data/accountsAPI'
import ENV from '../../../../../data/envs/env'

import {TSignUpCreateRequest, TSignUpCredentials, TSignUpRequest} from './accountsTypes'

export class AccountsSignUp {
  public async signUpCredentials(userData: TSignUpCredentials, password: string): Promise<unknown> {
    const response: AxiosResponse = await axios.post(
      ENV.ACCOUNTS + paths.signUp.credentials,
      userData,
      {headers: {password: password}}
    )
    return response.data
  }

  public async signUpCreateRequest(userData: TSignUpCreateRequest): Promise<unknown> {
    const response: AxiosResponse = await axios.post(
      ENV.ACCOUNTS + paths.signUp.credentials,
      userData
    )
    expect(response.status).toEqual(201)
    return response.data
  }

  public async signUpRequest(data: TSignUpRequest, code: string): Promise<unknown> {
    const response: AxiosResponse = await axios.post(
      ENV.ACCOUNTS + paths.signUp.request,
      data,
      {headers: {code: code}}
    )
    expect(response.status).toEqual(201)
    return response.data
  }
}
