/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthenticationAPIHelper} from './authenticationAPIHelper'
import {expect} from '@playwright/test'
import {paths} from 'data/skynet'
import {TLoginUserData} from '..'
import axios, {AxiosResponse} from 'axios'
import ENV from '../../../../data/envs/env'

export interface ILoan {
  applicationId: string,
  loanId: string,
  loanNumber: string,
  oldLoanNumber: unknown,
  loanPurpose: string,
  primaryBorrowerFirstName: string,
  primaryBorrowerLastName: string,
  primaryBorrowerFullName: string,
  lastModified: string,
  dateCreated: string,
  fullAddress: string,
  state: string,
  lockDate: unknown,
  statusDescription: any[],
  percentDescription: any[],
  milestoneProgress: any[]
}

export interface LoanResponse {
  data: ILoan[]
}

export class LoanAPIHelper extends AuthenticationAPIHelper {
  constructor() {
    super()
  }

  async getLoan(loanId: string, userData?: TLoginUserData): Promise<unknown> {
    await this.useTokenOf(userData)
    const response: AxiosResponse<unknown> = await axios.get(
      ENV.SKYNET_API + paths.application.loanID(loanId),
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data
  }

  async getLoanInfo(userData?: TLoginUserData): Promise<unknown> {
    await this.useTokenOf(userData)
    const response: AxiosResponse<unknown> = await axios.get(
      ENV.SKYNET_API + paths.application.loanInfo,
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data
  }

  async getLoanInfoМ2(userData?: TLoginUserData): Promise<unknown> {
    await this.useTokenOf(userData)
    const response: AxiosResponse<unknown> = await axios.get(
      ENV.SKYNET_API + paths.application.loanInfoV2,
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data
  }

  async getLoanInfoLastsLoans(userData?: TLoginUserData): Promise<ILoan[]> {
    await this.useTokenOf(userData)
    const response: AxiosResponse<LoanResponse> = await axios.get(
      ENV.SKYNET_API + paths.application.loanInfo + '?filter=&order=dateCreated;desc&pageNumber=1&pageSize=25',
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data.data
  }

  /**
   *
   * @param userData login for user
   * @param status status by which you need to find Loan
   * @returns loan data
   */
  async findLoanByStatus(userData: TLoginUserData, status: string) {
    const data = await this.getLoanInfoLastsLoans(userData)
    const obj = (data as Array<any>).find(o => o.statusDescription && o.statusDescription.text === status)
    return obj
  }
  
  /**
   *
   * @param userData login for user
   * @param applicationId applicationID from Apply
   * @returns loan data
   */
  async findLoanByApplicationID(applicationId: string, userData?: TLoginUserData) {
    const data = await this.getLoanInfoLastsLoans(userData)
    const obj = (data as ILoan[]).find(o => o.applicationId === applicationId)
    return obj
  }
}
