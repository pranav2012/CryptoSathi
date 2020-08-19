import React from 'react';
import '../../styles/dashboard.scss';
import Nav from './Nav';

function Dashboard({id,name,logout}) {
    return (
        <>
            <Nav logout={logout}/>
            <div className='dashboard'>
                <p>Hey {name}, welcome your id is {id} </p>
            </div>
        </>
    )
}

export default Dashboard;
