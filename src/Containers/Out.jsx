import React from 'react';
import LoginForm from '../Components/Authantication/LoginForm';

function Out({resetpass,loaduser,signclick,backend_url}){

     return(
            <div className='outer'>
                <LoginForm resetpass={resetpass} loaduser={loaduser} signclick={signclick} backend_url={backend_url} />
            </div>
        );
}

export default Out;