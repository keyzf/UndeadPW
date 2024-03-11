export const paths = {
  loanOptions: {
    cachedLoanOptions: (companyId: string, applicationId: string, secretKey: string) =>
      `/api/companies/${companyId}/applications/${applicationId}/cached-loan-options/v1?secretKey=${secretKey}`,
  }
}
