import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth'
import { auth } from './firebase'

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: unknown) {
    return { user: null, error: (error as Error).message }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: unknown) {
    return { user: null, error: (error as Error).message }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: unknown) {
    return { error: (error as Error).message }
  }
}

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}
