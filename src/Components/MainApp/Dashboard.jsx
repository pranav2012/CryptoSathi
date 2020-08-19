import React from 'react';
import '../../styles/dashboard.scss';
import Nav from './Nav';

function Dashboard({user,logout}) {
    return (
        <>
            <Nav logout={logout}/>
            <div className='dashboard'>
                <p>Hey {user.name}, welcome your id is {user.id} </p>
            </div>
        </>
    )
}

export default Dashboard;
