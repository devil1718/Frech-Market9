import React from 'react';
import GoogleLogin from 'react-google-login';



export default function GoogleSignin() {
  const handleSuccess = (response) => {
    console.log(response);
  };

  const handleFailure = (error) => {
    console.log('Login failed:', error);
  };

  return (
    <>
      <GoogleLogin
        clientId="658172068205-l1rp7h1irdkj3mk2de44h7l154vj0lqf.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}
