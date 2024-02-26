// Assets Page
export interface AssetsData {
  assetType: string,
  depositorInstitution?: string,
  accountNumber?: string,
  value?: string,
  relationship?: string,
  gifterName?: string,
  amount?: string,
  deposited?: string,
}

export interface Assets {
  hasAsset: string,
  assetsData?: AssetsData | undefined
}

export interface YourName {
  firstName: string,
  middleName?: string | undefined,
  lastName: string
  suffix?: string | undefined
}

export interface YourContactInformation {
  email: string,
  cellPhoneNumber: string,
  homeNumber?: string,
  workNumber?: string,
}

export interface AdditionalInformation {
  dateOfBirth: string,
  maritalStatus: string,
  socialSecurity: string,
  citizenshipStatus: string,
  dependents?: string,
  ageOfDependents?: string
}

export interface FullPersonalInfo {
  namePart: YourName,
  contactInfo: YourContactInformation,
  additionalInfo: AdditionalInformation
}

export interface IncomeTypeLikeW2 {
  currentlyEmployed: string,
  employerName: string,
  startDate: string,
  endData?: string,
  jobTitle: string,
  monthlySalary: string,
  yearsProfession: string,
  monthProfession?: string,
  familyMember?: string,
  streetAddress: string,
  phoneNumber: string,
  receiveBonus: string
}

export interface IncomeTypeLikeAlimony {
  startDate: string,
  monthlyIncome: string,
}

export interface Income {
  income: string
  incomeType?: string | undefined
  incomeData?: IncomeTypeLikeW2 | IncomeTypeLikeAlimony
}

// Personal Info
export interface PersonalInfo {
  firstName: string,
  lastName: string,
  email: string,
  mobileNumber: string
}

// Property Information Step
export interface PropertyDetails {
  yearBuilt: string,
  typeOfProperty: string,
  attachmentType: string
  propertyStatus?: string | undefined
}

export interface HomeownersAssociation {
  homeownersAssociation: string
}

export interface PropertyOtherExpenses {
  otherExpenses: string
}

export interface RentalIncome {
  rentalIncome: string
}

export interface MortgageRemaining {
  amountOwned: string
  mortgageRemaining?: string | undefined
  amountPayment?: string | undefined
}

export interface PropertyInformation {
  propertyDetails: PropertyDetails,
  taxesInsurance: PropertyTaxesInsurance,
  homeownerAssociation: HomeownersAssociation,
  otherExpenses: PropertyOtherExpenses,
  rentalIncome: RentalIncome,
  mortgageRemaining: MortgageRemaining
}

// REO Step
export interface TypeOfProperty {
  typeOfProperty: string
}

export interface StreetAddress {
  streetAddress: string
}

export interface RemainingProperty {
  remainingProperty: string,
  amountOwned?: string | undefined,
  amountOfPayment?: string | undefined
}

export interface PropertyTaxesInsurance {
  annualProperty: string
}

export interface REOTaxesInsurance {
  escrowing: string,
  property: string,
  homeownersInsurance: string
}

export interface AssociationFee {
  associationFee: string,
  monthlyAssociationFeeAmount?: string,
  associationName?: string | undefined,
  associationEmail?: string | undefined,
  associationPhoneNumber?: string | undefined
}

export interface OtherExpenses {
  otherExpenses: string,
  currentMarketValue: string,
  propertyStatus: string,
  occupancy?: string | undefined
}

export interface Reo {
  reo: string,
  typeOfProperty?: TypeOfProperty,
  streetAddress?: StreetAddress,
  remainingProperty?: RemainingProperty,
  taxesInsurance?: REOTaxesInsurance,
  associationFee?: AssociationFee,
  otherExpenses?: OtherExpenses,
  otherRealEstate?: string | undefined
}

// Residence Info Step
export interface ResidenceInfo {
  streetAddress: string,
  startDate: string,
  residenceType: string,
  doYourPayRent: string,
  payEachMonthInput?: string | undefined
}

// Title Holder Step
export interface TitleHolderItem {
  firstName: string,
  middleName?: string | undefined,
  lastName: string,
  suffix?: string | undefined,
  emailAddress: string,
  cellPhoneNumber: string,
  mannerHeld?: string | undefined
}

export interface TitleHolder {
  isTitleHolder: string,
  titleHolder?: TitleHolderItem
}

// Declarations Step and Substeps
export interface DemographicInformation {
  ethnicity: string,
  subLatino?: string,
  sex: string,
  race: string,
  subAsian?: string,
  americanTribe?: string,
  otherPacificIslander?: string
}

export interface Finances {
  coSigner: string,
  outstandingJudgments: string,
  currentlyDelinquent: string,
  partyToLawsuit: string,
  foreclosure: string,
  preForeclosure: string,
  propertyForeclosed: string,
  bankruptcy: string,
  typeBankruptcy?: string
}

export interface Bankruptcy {
  typeBankruptcy?: string
}

export interface HomeownershipEducationAndHousingCounseling {
  homeownershipEducation: string,
  educationFormat?: string,
  educationHudProgram?: string,
  educationDateOfCompletion?: string,
  housingCounseling: string,
  housingCounselingFormat?: string,
  housingCounselingHudProgram?: string,
  housingCounselingDateOfCompletion?: string,
}

export interface LanguagePreferences {
  language: string
  other?: string
}

export interface MilitaryServices {
  militaryServices: string,
  currentlyServing?: string
}

export interface PropertyAndLoan {
  occupyProperty: string,
  ownershipInterest: string,
  ownershipInterestData: OwnerShipInterest,
  familyRelationship?: string,
  borrowingMoney: string,
  amount?: string,
  mortgageLoan: string,
  newCredit: string,
  firstMortgageLien: string,
}

export interface OwnerShipInterest {
  typePropertyOwn: string,
  holdTitleProperty: string
}

export interface PropertyOfLoanValues {
  ownerShipInterest?: OwnerShipInterest,
  amount?: string
}

// DECLARATIONS - MILITARY SERVICES
export interface MilitaryServices {
  militaryParameter: string,
  servingActiveDutyCheckbox: string
  retiredCheckbox: string
  nonActivatedMemberCheckbox: string
  survivingSpouseCheckbox: string
}

export interface HUDApproved {
  program: string,
  dateOfCompletion: string
}

export interface Education {
  format: string,
  hudApproval?: HUDApproved
}

export interface HousingCounseling {
  format?: string
  hudApproval?: HUDApproved
}

export interface HomeownershipEducationHousingCounseling {
  education?: Education,
  housingCounseling?: HousingCounseling
}
