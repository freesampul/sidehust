import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

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
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <FormInput minlength="3" maxLength="20" label="Display Name" name="displayName" type="text" value={displayName} handleChange={handleChange} required/>
                <FormInput  label="Email" name="displayName" type="text" value={displayName} handleChange={handleChange} required/>
                <FormInput  label="Password" minlength="6" name="displayName" type="text" value={displayName} handleChange={handleChange} required/>
                <FormInput  label="Confirm Password" minlength="6" name="displayName" type="text" value={displayName} handleChange={handleChange} required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
