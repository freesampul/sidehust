import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBUgh6WBKZyp3CzCOJ9b8sgzQOwrnr13Wg",
  authDomain: "crwn-clothui.firebaseapp.com",
  projectId: "crwn-clothui",
  storageBucket: "crwn-clothui.appspot.com",
  messagingSenderId: "143128131551",
  appId: "1:143128131551:web:a385d88978b19f5136f66a"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const displayName = additionalInformation.displayName;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      },
      console.log("user created", displayName));
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateDisplayName(userCredential.user, displayName);
    }

    return userCredential;
  } catch (error) {
    console.error('Error creating the user', error.message);
    throw error; 
  }
};

const updateDisplayName = async (user, displayName) => {
  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    console.error('Error updating display name', error.message);
    throw error;
  }
};

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = () => {
    signOut(auth);
  };

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

