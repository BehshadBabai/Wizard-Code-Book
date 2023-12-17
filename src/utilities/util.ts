import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

export const addDocWithoutId = async (tableName: string, data: any) => {
  const iCollection = collection(firestore, tableName);
  const ref = await addDoc(iCollection, data);
  return ref;
};

export const addOrEditDoc = async (
  operation: 'add' | 'edit',
  tableName: string,
  id: string,
  data: any
) => {
  const operatingFunction = operation === 'add' ? setDoc : updateDoc;
  const iCollection = collection(firestore, tableName);
  const ref = doc(iCollection, id);
  return await operatingFunction(ref, data);
};

export const fetchAllDocuments = (table: string) => {
  const iCollection = collection(firestore, table);
  return getDocs(iCollection);
};

export const fetchSingleDocument = (table: string, id: string) => {
  const ref = doc(firestore, table, id);
  return getDoc(ref);
};

export const deleteDocument = async (table: string, id: string) => {
  const ref = doc(firestore, table, id);
  await deleteDoc(ref);
};

export const firebaseErrorCodes = {
  invalidLogin: 'auth/invalid-login-credentials',
};
