import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {
  
  return (
      <div className="h-screen bg-gradient-to-b from-red-50 to-white-100  mt-[-15]">
      <div className="authentication-container bg-gradient-to-b from-red-50 to-white-100">
        <SignInForm />
        <SignUpForm />
      </div>
      </div>
    );
  };
  
  export default Authentication;