'use client'

export interface User {
  id: string
  email: string
  name: string
  phone?: string | null
  isEmailVerified?: boolean
  createdAt?: string
}

export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

/**
 * Register a new user
 */
export async function register(
  email: string,
  password: string,
  name: string,
  phone?: string
): Promise<AuthResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, phone }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed')
  }

  return data
}

/**
 * Login user
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }

  return data
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
  })
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function resendVerification(): Promise<{ message: string }> {
  const res = await fetch('/api/auth/resend-verification', { method: 'POST' })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to send verification email')
  return data
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
  const res = await fetch('/api/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to change password')
  return data
}

export async function getProfile(): Promise<User | null> {
  const res = await fetch('/api/user/profile', { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.user as User
}

export async function updateProfile(name: string, phone?: string | null): Promise<User> {
  const res = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update profile')
  return data.user as User
}

