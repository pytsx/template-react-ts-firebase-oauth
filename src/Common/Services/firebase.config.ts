import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebase_config = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_APIKEY,
  // @ts-ignore
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  // @ts-ignore
  projectId: import.meta.env.VITE_PROJECTID,
  // @ts-ignore
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  // @ts-ignore
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  // @ts-ignore
  appId: import.meta.env.VITE_APPID,
  // @ts-ignore
  measurementId: import.meta.env.VITE_MEASUREMENTID,
  // @ts-ignore
  databaseURL: import.meta.env.VITE_DATABASEURL
}

// @ts-ignore
export const app = initializeApp(firebase_config)
export const database = getDatabase(app)


