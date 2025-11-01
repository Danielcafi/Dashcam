"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getProfile, updateProfile, resendVerification, changePassword, type User } from '@/lib/auth-client'
import Link from 'next/link'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [sendingVerify, setSendingVerify] = useState(false)
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [changingPwd, setChangingPwd] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      const profile = await getProfile()
      if (!profile) {
        router.push('/login')
        return
      }
      setUser(profile)
      setProfileForm({ name: profile.name || '', phone: profile.phone || '' })
      setLoading(false)
    }
    load()
  }, [router])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingProfile(true)
    setError('')
    try {
      const updated = await updateProfile(profileForm.name, profileForm.phone)
      setUser(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const handleResend = async () => {
    setSendingVerify(true)
    setError('')
    try {
      await resendVerification()
      alert('Verification email sent. Please check your inbox.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification email')
    } finally {
      setSendingVerify(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setChangingPwd(true)
    setError('')

    if (pwdForm.newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      setChangingPwd(false)
      return
    }
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setError('Passwords do not match')
      setChangingPwd(false)
      return
    }

    try {
      await changePassword(pwdForm.currentPassword, pwdForm.newPassword)
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      alert('Password updated successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
    } finally {
      setChangingPwd(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading account...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and account security</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Email verification status */}
        {!user.isEmailVerified && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-4 rounded-md flex items-center justify-between">
            <div>
              <p className="font-medium">Your email is not verified.</p>
              <p className="text-sm">Please verify to unlock all features.</p>
            </div>
            <Button onClick={handleResend} disabled={sendingVerify}>
              {sendingVerify ? 'Sending...' : 'Resend Verification Email'}
            </Button>
          </div>
        )}

        {/* Profile form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={savingProfile}>
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={pwdForm.currentPassword}
                onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={pwdForm.newPassword}
                onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={pwdForm.confirmPassword}
                onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={changingPwd}>
                {changingPwd ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>

        {/* Helpful links */}
        <div className="mt-8 text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Return to home</Link>
        </div>
      </div>
    </div>
  )
}

