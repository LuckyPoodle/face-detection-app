import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Logo.css';

import Tilt from 'react-tilt';

const Logo = () => {
    return (

        <div className="ma4 mt0">
        
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 100, width: 100}} >
                
            <FontAwesomeIcon className="Tilt-inner pa3 mylogo" style={{paddingTop:'30px'}} icon="bolt" size="3x" />
              
            </Tilt>

        </div>



    );
}

export default Logo;