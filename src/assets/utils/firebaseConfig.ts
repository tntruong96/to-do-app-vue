// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { collection, deleteDoc, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_VUE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_VUE_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_VUE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_VUE_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

//initialize firebase auth
const db = getFirestore(firebaseApp)
const auth = getAuth()
const analytics = getAnalytics(firebaseApp)
const batch = writeBatch(db)

export { firebaseApp, auth, batch }

export const taskRef = collection(db, 'task')

export const clearCollection = async (name: string) => {
  const collectionRef = collection(db, name)

  try {
    const querySnapshot = await getDocs(collectionRef)

    const deletePromises = querySnapshot.docs.map((document) => {
      return deleteDoc(doc(db, name, document.id))
    })

    await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error clearing collection:', error)
  }
}
