import {expect} from '@playwright/test'
import {paths} from 'data/apply'
import axios, {AxiosResponse} from 'axios'
import ENV from '../../../../data/envs/env'

export type TCachedLoanOptions = {
    companyId: string,
    applicationId: string,
    secretKey: string,
}

export type TApplicationOptions = {
  loanOptionId: string,
  programId: string,
  name: string,
  internalName: string,
  loanPeriod: number,
  rate: number,
  rateSheetId: string,
  apr: number,
  fees: number,
  cost3Year: number,
  cost5Year: number,
  cost8Year: number,
  pmi: number,
  paymentMonth: number,
  cashOutAmount: null,
  additionalInfo: string,
  feeDetails: {
    'APPRAISAL FEE': number,
    'CLOSING / ESCROW FEE': number,
    'CLOSING PROTECTION LETTER': number,
    'DA Fee 0807': number,
    EXAMINATION: number,
    'GLOBAL CUSTOM EXP': number,
    Global_Custom_Unlimited_Tolerance_fee: number,
    Global_Custom_Zero_Tolerance_Fee: number,
    'LENDERS COVERAGE': number,
    Local_Custom_Zero_Tolerance_Fee: number,
    'RECORDING FEE': number,
    'RECORDING FEES': number,
    'STATE OF STATE POLICY FEE': number,
    'TAX CERT': number
  },
  points: number,
  discountAmount: number,
  interestOnlyPayment: number,
  interestOnlyPeriod: number,
  interestOnly: boolean,
  amortTerm: number,
  rateAdjustmentPeriod: null,
  amortizationType: boolean,
  originationFeeRate: number,
  originationFeeAmount: number,
  originationFeeType: string,
  programLoanType: string,
  isDeleted: boolean,
  adjustments: [],
  caps: [],
  isAusRun: boolean,
  finalBuyPrice: number,
  buyPrice: number,
  totalAdjustmentBeforeCap: null,
  totalAdjustmentAfterCap: number,
  piti: number,
  miCoveragePercent: null,
  pmiPercent: null,
  taxesInsuranceEscrowed: boolean,
  escrowRequired: boolean,
  interestRateAtPar: number,
  productId: null,
  optimalBlueLenderId: null,
  lenderName: null,
  aprAtPar: number,
  principalInterestAtPar: number,
  compensationPoints: null,
  compensationType: null,
  compensationAmount: null,
  flatFee: null,
  lockTerm: null
}
  
export class LoanOptionsAPIHelper {
  async getLoanIdAssets(data: TCachedLoanOptions, xFunctionKey: string): Promise<TApplicationOptions[]> {
    const response: AxiosResponse<unknown> = await axios.get(
      ENV.APPLY_API + paths.loanOptions.cachedLoanOptions(data.companyId, data.applicationId, data.secretKey),
      {
        headers: {
          'x-functions-key': xFunctionKey
        },
      }
    )
    expect(response.status).toEqual(200)
    return response.data as TApplicationOptions[]
  }
}
