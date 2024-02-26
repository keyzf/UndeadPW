export interface ButtonData {
  text: string;
  disabled: boolean;
}

export interface InputData {
  value: string;
  disabled: boolean;
}

export interface StreetAddress {
  address?: string | undefined,
  zipCode?: string | undefined,
  clear?: boolean | undefined
}
