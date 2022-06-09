//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSZv6pr9-K3in5pAFDuBZA7pGE4pFUvOI",
  authDomain: "feed-5635e.firebaseapp.com",
  projectId: "feed-5635e",
  storageBucket: "feed-5635e.appspot.com",
  messagingSenderId: "449712639691",
  appId: "1:449712639691:web:45aeb68d5b8b2d6978154e",
  measurementId: "G-HH2VH0DX3M"
  };

// firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { db };
