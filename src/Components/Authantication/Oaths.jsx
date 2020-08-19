import React from 'react';
import GoogleLogin from 'react-google-login';

const clientid = {
                    production: "",
                    local: ""
                }

const googlebtn = (responseGoogle,btntext) =>{
    return(
        <GoogleLogin
                clientId={clientid.heroku}
                render={renderProps => (
                    <button onClick={renderProps.onClick}><i className="fa fa-google"> <span className='authname'>{btntext}</span></i></button>
                )}
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
    );
}

const Oaths = ({googlesignup}) => {
    const responseGoogle = (response) => {
        const {email} = response.profileObj;
        googlesignup(email);
    }
    return (
        <div className='oth'>
          {googlebtn(responseGoogle, "LogIn")}
        </div>
    );
}

const Soaths = ({googleregister}) => {
    const responseGoogle = (response) => {
        const {name,email} = response.profileObj;
        googleregister(name,email);
    }
    return (
        <div className='oth'>
          {googlebtn(responseGoogle, "SignUp")}
        </div>
    );
}

export {
    Oaths,
    Soaths
}