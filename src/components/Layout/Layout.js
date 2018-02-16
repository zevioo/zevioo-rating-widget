import React from 'react'
import Aux from '../../hoc/Aux'
import '../../index.css'

const layout = (props) => {
    return (
        <Aux>
            <h3 className="zevioo-h3">
            Εγγυημένες αξιoλογήσεις από το 
            <span className="zevioo-title"> Zevioo 
            </span> 
            </h3>
        <div>
            {props.children}
        </div>
        </Aux>
    )

}

export default layout;