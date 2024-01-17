import {
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordAuth,
  signOut,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  get,
} from 'firebase/database';

// Additional import statement
import AsyncStorage from '@react-native-async-storage/async-storage';

let firebaseApp;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD67BuqU0b4tMS2aDGn_7YQo5_0O_UqhBM",
    authDomain: "pd-test-b7811.firebaseapp.com",
    databaseURL: "https://pd-test-b7811-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pd-test-b7811",
    storageBucket: "pd-test-b7811.appspot.com",
    messagingSenderId: "127494095524",
    appId: "1:127494095524:web:69b7f6ee317c2a63491c31",
    measurementId: "G-QN6X91BV08"
  };

  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
    initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

    return firebaseApp;
  } else {
    // Firebase app is already initialized, return the existing app
    return getApps()[0];
  }
};
export const signUpWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName,
    });

    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPasswordAuth(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signOutUser = async () => {
  const auth = getAuth(firebaseApp);

  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Function to write user data to the Realtime Database
export const writeUserData = async (userId, name, email, imageUrl) => {
  const database = getDatabase(firebaseApp);
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};

export const addUserData = async (userId, userData) => {
  const database = getDatabase(firebaseApp);
  const usersRef = ref(database, 'users');

  try {
    const newUserRef = push(usersRef);
    await set(newUserRef, userData);
    return newUserRef.key;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserData = async (userId, userData) => {
  const database = getDatabase(firebaseApp);
  const userRef = ref(database, `users/${userId}`);

  try {
    await update(userRef, userData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserData = async (userId) => {
  const database = getDatabase(firebaseApp);
  const userRef = ref(database, `users/${userId}`);

  try {
    await remove(userRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserData = async (userId) => {
  const database = getDatabase(firebaseApp);
  const userRef = ref(database, `users/${userId}`);

  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
