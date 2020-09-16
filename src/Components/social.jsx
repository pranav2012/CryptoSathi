import React from 'react';

function social() {
    return (
        <div className='social'>
            <h3>Our Social</h3>
            <div className="rounded-social-buttons">
                <a className="social-button facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook-f"></i></a>
                <a className="social-button github" href="https://www.github.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                <a className="social-button twitter" href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                <a className="social-button linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                <a className="social-button youtube" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
                <a className="social-button instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
            </div>
        </div>
    )
}

export default social;
