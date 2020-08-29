import React from 'react';
import 'tachyons';

function Nav({logout}) {
    return(
        <>
            <nav>
                <ul className='nav'>
                    <li className='navlogo'>CryptoSathi</li>
                    <li className='navp navpl' onClick={logout}>Log-Out</li>
                </ul>
            </nav>
        </>
    );
}

export default Nav;