export interface User {
  userId: number
  name: string
  midName: string | null
  surname: string
  email: string
  statusId: number
  addrStreet: string
  addrStreet2: string
  addrCity: string
  addrProvince: string
  addrCountry: string
  addrPostal: string
  createdAt: string
  lastLoginTime: string
  lastIp: string | null
  accessToken: string | null
  tokenId: string | null
  tokenExpiryTime: string | null
}

export type LoginResponse =
  | {
      message: string
      user: {
        status: number
        name: string
        surname: string
      }
      userId: number
      tokens: {
        accessToken: string
        idToken: string
        refreshToken: string
      }
    }
  | {
      message: string
    }

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ConfirmEmailData {
  code: string
  email: string
}

export interface PatchUserStatusData {
  userId: number
  statusId: number
}

export interface PatchUserNameData {
  userId: number
  firstName?: string
  lastName?: string
}
