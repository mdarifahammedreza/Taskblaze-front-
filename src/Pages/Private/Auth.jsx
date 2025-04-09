import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

// Firebase Auth Setup
const auth = getAuth();

// Providers
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Handle Errors
const handleError = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.customData?.email;
  const credential = error.credential;

  console.error('Error Code: ', errorCode);
  console.error('Error Message: ', errorMessage);
  console.log('Email: ', email);
  console.log('Credential: ', credential);
};

// Facebook Authentication
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    console.log('User Info: ', user);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log('Access Token: ', accessToken);
  } catch (error) {
    handleError(error);
  }
};

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('User Info: ', user);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log('Access Token: ', token);
  } catch (error) {
    handleError(error);
  }
};

// GitHub Authentication
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log('User Info: ', user);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log('GitHub Access Token: ', token);
  } catch (error) {
    handleError(error);
  }
};

// Email Sign-up
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Signed up successfully: ', user);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};

// Email Sign-in
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Signed in successfully: ', user);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};

// Sign-out
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('Sign-out successful.');
  } catch (error) {
    console.log('Error signing out: ', error);
  }
};
