import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYEhVgAW2COU2oGn0EXhxx1OwmIucFEWY",
  authDomain: "sidehustles-ff134.firebaseapp.com",
  projectId: "sidehustles-ff134",
  storageBucket: "sidehustles-ff134.appspot.com",
  messagingSenderId: "853886376027",
  appId: "1:853886376027:web:400bb90770b5f98ec5477e",
  measurementId: "G-EDGXYC5G4C",
};

const firebaseApp = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return firebaseApp;
};

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const { uid, displayName, email } = userAuth;

  if (!displayName) {
    console.error("Display name is null or undefined");
    return;
  }

  // Check if the username (displayName) is already taken
  const usernameDocRef = doc(db, "usernames", displayName);
  const usernameSnapshot = await getDoc(usernameDocRef);

  if (usernameSnapshot.exists()) {
    return; // Exit the function if the username is not unique
  }

  // If the username is unique, proceed to create the user document
  const userDocRef = doc(db, "users", uid);

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (displayName) {
      await updateDisplayName(userCredential.user, displayName);
    }

    return userCredential;
  } catch (error) {
    console.error("Error creating the user", error.message);
    throw error;
  }
};

const updateDisplayName = async (user, displayName) => {
  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    console.error("Error updating display name", error.message);
    throw error;
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const doesUserExist = async (displayName) => {
  try {
    const userDocRef = doc(db, "usernames", displayName);
    const userSnapshot = await getDoc(userDocRef);

    // Check if the document exists
    console.log("userSnapshot", userSnapshot.exists());
    return userSnapshot.exists();
  } catch (error) {
    return false; // Return false in case of an error
  }
};

export const getCheckoutUrl = async (app, priceId) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const error = data.error;
      const url = data.url;
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

// Function to get a portal URL
export const getPortalUrl = async (app) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  let dataWithUrl;
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const result = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    dataWithUrl = result.data;
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    if (dataWithUrl && dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};

export { firebaseApp };
const getPremiumStatus = async (app) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          console.log("Active or trialing subscription found");
          const subscriptionData = snapshot.docs[0].data(); // Assuming only one subscription exists
          const subscriptionType = subscriptionData.type; // Adjust this based on your Firestore structure
          resolve(subscriptionType);
        }
        unsubscribe();
      },
      reject
    );
  });
};

export { getPremiumStatus };
