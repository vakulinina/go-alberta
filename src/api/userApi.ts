import { User, LoginResponse, RegisterData, ConfirmEmailData, PatchUserStatusData } from '@/types/user'

if (!process.env.NEXT_PUBLIC_USERS_API_URL) {
  throw new Error('Users API URL is not defined')
}

const BASE_URL = process.env.NEXT_PUBLIC_USERS_API_URL

export const userApi = {
  async getUserById(userId: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || 'Failed to fetch user')
    }

    const user = await response.json()
    return user
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      if (response.status === 401) throw new Error('Invalid email or password')
      throw new Error(error.message || 'Login failed')
    }

    const data: LoginResponse = await response.json()

    return data
  },

  async register(data: RegisterData): Promise<{ message: string; email: string }> {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.email,
        name: data.firstName,
        surname: data.lastName,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      if (response.status === 409) throw new Error('Email already exists')
      if (response.status === 400) throw new Error('Invalid input data')
      throw new Error(error.message || 'Registration failed')
    }
    const responseData = await response.json()

    return {
      message: responseData.message || 'Registration successful!',
      email: data.email,
    }
  },

  async confirmEmail(data: ConfirmEmailData): Promise<{ message: string }> {
    const response = await fetch(`${BASE_URL}/users/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: data.code, username: data.email }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Email confirmation failed')
    }

    return response.json()
  },

  async getCurrentUser(userId: number): Promise<{ firstName: string; lastName: string }> {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch current user.')
    }

    const user = await response.json()
    return { firstName: user.name, lastName: user.surname }
  },

  async patchUserStatus(data: PatchUserStatusData): Promise<{ message: string }> {
    const response = await fetch(`${BASE_URL}/users/${data.userId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ statusId: data.statusId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update user status')
    }

    return response.json()
  },

  async patchUserName(
    firstName: string,
    lastName: string,
    userId: number,
    phoneNumber: string
  ): Promise<{ message: string }> {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        phone: phoneNumber,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Failed to update user name')
    }

    const message = await response.text()

    return { message }
  },
}

export const getUserSavedCampaigns = async (userId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/campaigns`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch saved campaigns: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching saved campaigns:', error)
    throw error
  }
}

export const addCampaignToSaved = async (userId: number, campaignId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/campaigns/${campaignId}`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error(`Failed to save campaign: ${response.status}`)
    }

    return response.text()
  } catch (error) {
    console.error('Error saving campaign:', error)
    throw error
  }
}

export const removeCampaignFromSaved = async (userId: number, campaignId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/campaigns/${campaignId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Failed to remove saved campaign: ${response.status}`)
    }

    return response.text()
  } catch (error) {
    console.error('Error removing saved campaign:', error)
    throw error
  }
}
