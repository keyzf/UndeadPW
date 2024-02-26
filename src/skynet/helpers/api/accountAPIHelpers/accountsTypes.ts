export type TSignUpCredentials = {
  clientId: string;
  companyId: string;
  userDto: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    userType: number;
    roleName: string;
    managerId: null;
  }
}

export type TSignUpCreateRequest = {
  clientId: string;
  companyId: string;
  domain: string;
  type: string;
  userDto: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    userType: number;
    roleName: string;
    managerId?: null;
  }
}

export type TSignUpRequest = {
  clientId: string;
  domain: string;
  requestId: string;
}
