export const accountsPaths = {
  signIn: {
    request: '/api/signin/request',
    credentials: '/api/signin/credentials',
    sso: '/api/signin/sso',
    createrequest: '/api/signin/create-request'
  },
  signUp: {
    request: '/api/signup/request',
    credentials: '/api/signup/credentials',
    createRequest: '/api/signup/create-request'
  },
  whiteLists: '/api/WhiteLists',
  userManagement: (companyID: string, userID: string) => `/api/companies/${companyID}/users/${userID}`,
  roleAssignments: (companyID: string) => `/api/companies/${companyID}/role-assignments`,
}
