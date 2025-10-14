import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Products
export const getProducts = async () => {
  try {
    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting products:', error)
    return []
  }
}

export const getProduct = async (id: string) => {
  try {
    const productRef = doc(db, 'products', id)
    const productSnap = await getDoc(productRef)
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting product:', error)
    return null
  }
}

export const addProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData)
    return docRef.id
  } catch (error) {
    console.error('Error adding product:', error)
    return null
  }
}

export const updateProduct = async (id: string, productData: any) => {
  try {
    const productRef = doc(db, 'products', id)
    await updateDoc(productRef, productData)
    return true
  } catch (error) {
    console.error('Error updating product:', error)
    return false
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id))
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    return false
  }
}

// Blog Posts
export const getBlogPosts = async () => {
  try {
    const postsRef = collection(db, 'blogPosts')
    const q = query(postsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting blog posts:', error)
    return []
  }
}

export const getBlogPost = async (slug: string) => {
  try {
    const postsRef = collection(db, 'blogPosts')
    const q = query(postsRef, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
    return null
  } catch (error) {
    console.error('Error getting blog post:', error)
    return null
  }
}

export const addBlogPost = async (postData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'blogPosts'), {
      ...postData,
      createdAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding blog post:', error)
    return null
  }
}

// Installers
export const getInstallers = async () => {
  try {
    const installersRef = collection(db, 'installers')
    const snapshot = await getDocs(installersRef)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting installers:', error)
    return []
  }
}

export const addInstaller = async (installerData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'installers'), installerData)
    return docRef.id
  } catch (error) {
    console.error('Error adding installer:', error)
    return null
  }
}

// Orders
export const addOrder = async (orderData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding order:', error)
    return null
  }
}

export const getOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting orders:', error)
    return []
  }
}
