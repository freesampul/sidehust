import { useState } from "react";
import { createUserDocumentFromAuth, singinAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormValues = {
    email: '',
    password: '',  
}

const SignInForm = () => {
    const [formFields, setformFields] = useState(defaultFormValues);
    const { email, password } = formFields;


    const resetFormFields = () => {
        setformFields(defaultFormValues);
    }

    const signInWithGoogle = async () => {
        const { user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
         const response = await singinAuthUserWithEmailAndPassword(
            email,
            password
          );
          alert('user signed in');
          resetFormFields();
        } catch (error) {
            if(error.code === 'auth/user-not-found') {
                alert('user not found');
            }
            else if(error.code === 'auth/wrong-password') {
                alert('wrong password');
            }
            else {
            console.log('user creation encountered an error', error);
            }
          }
    }



    const handleChange = (event) => {
      const {name, value} = event.target;
      setformFields({...formFields, [name]: value});
    };




    return (
        <div className="sign-in-container">
          <h2>Already have an account</h2>
            <span>Sign in with your info</span>
            <form onSubmit={handleSubmit}>
                <FormInput  label="Email" name="email" type="text" value={email} onChange={handleChange} required/>
                <FormInput  label="Password" name="password" type="password" value={password} onChange={handleChange} required/>
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={"google"} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
