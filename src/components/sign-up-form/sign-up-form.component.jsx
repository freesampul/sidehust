import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss'; 

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',  
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setformFields] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setformFields(defaultFormValues);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }
    
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
    
          await createUserDocumentFromAuth(user, { displayName });
          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
        }
      };

    const handleChange = (event) => {
      const {name, value} = event.target;
    setformFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
          <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput minLength="3" maxLength="20" label="Display Name" name="displayName" type="text" value={displayName} onChange={handleChange} required/>
                <FormInput  label="Email" name="email" type="text" value={email} onChange={handleChange} required/>
                <FormInput  label="Password" minLength="6" name="password" type="password" value={password} onChange={handleChange} required/>
                <FormInput  label="Confirm Password" minLength="6" name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} required/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
