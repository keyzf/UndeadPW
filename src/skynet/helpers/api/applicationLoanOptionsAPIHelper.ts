import {AuthenticationAPIHelper} from './authenticationAPIHelper'
import {expect} from '@playwright/test'
import {paths} from 'data/skynet'
import {TLoginUserData} from '..'
import axios, {AxiosResponse} from 'axios'
import ENV from '../../../../data/envs/env'

export type TDataLoanOptions = {
    appraisedValue: number,
    loanAmount: number,
    refinancePurpose: string,
    loanPurpose: string,
    heloc: unknown,
    taxesInsuranceEscrowed: boolean,
    requestMetadata: {
        tabId: number
    },
    isTest: boolean
}

type TLoanOptions = {
  lockedRateSheetId: string,
  lockedRateSheetName: string
  loanOptions: Options[],
  errorStatus: string,
  type: string
}

type Options = {
  loanOptionId: string,
  programId: string,
  internalName: string,
  rate: number,
  apr: number,
  fees:number,
  paymentMonth: number,
  pmi: number,
  points: number, 
  discountAmount: number,
  loanPeriod: number,
  feeDetails: [unknown],
  adjustments: [unknown],
  caps: [unknown],
  finalBuyPrice: number,
  buyPrice: number,
  totalAdjustmentBeforeCap: null,
  totalAdjustmentAfterCap: number,
  taxesInsuranceEscrowed: boolean,
  escrowRequired: boolean,
  lenderName: null,
  compensationPoints: null,
  originationFeeAmount: number,
  originationFeeRate: number,
  isDeleted: boolean
}

export class ApplicationLoanOptions extends AuthenticationAPIHelper {
  constructor() {
    super()
  }

  async getLoanOptions(loanId: string, data: TDataLoanOptions, userData?: TLoginUserData): Promise<TLoanOptions>  {
    await this.useTokenOf(userData)
    const response: AxiosResponse<unknown> = await axios.post(
      ENV.SKYNET_API + paths.application.loanOptions(loanId),
      data,
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data as TLoanOptions
  }
}