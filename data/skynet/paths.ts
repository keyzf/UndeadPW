export const paths = {
  application: {
    loanID: (loanId: string) => `/loan/${loanId}`,
    loanInfo: '/loan/info',
    loanInfoV2: '/loan/info/v2',
    deleteLoanById: (loanId: string) => `/loan/${loanId}`,
    loanOptions: (loanId: string) => `/loan/${loanId}/loan-options`
  },
  authentication: {
    authenticationLogin: '/Authentication/Login'
  },
}
