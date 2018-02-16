import React from 'react'
import Aux from '../../hoc/Aux'
import '../../index.css'
import Logo from '../Logo/Logo.svg'

const layout = (props) => {
    return (
        <Aux>
            <h3 className="zevioo-h3">
            Αυθεντικές αξιολογήσεις 
            <span className="zevioo-title">από το 
            <img src={Logo} className="zevioo-logo" alt="zevioo logo"/>
            
            </span> 
            </h3>
        <div>
            {props.children}
        </div>
        </Aux>
    )

}

export default layout;