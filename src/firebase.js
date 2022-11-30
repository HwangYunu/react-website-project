import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// 인증
const auth = firebase.auth()
// https://stackoverflow.com/questions/62694558/firebase-auth-import-source-map-warnings
// auth 추가 시 발생하는 Warning해결은 위 링크 참조

// PostWrite의 게시물 번호 업데이트를 위함
const fieldValue = firebase.firestore.FieldValue

export { db, auth, fieldValue }
