import React from 'react';
import '../../../index.css';

const productReviewActions = (props) => {
    return (
        <div className="zevioo-product-review-actions">
        <div className="zevioo-button" onClick={props.click}>
            <span className="zevioo-button-icon"></span>
            <span className="zevioo-button-text"> Αξιολογηστε το </span>
        </div>
        </div>
    )

}

export default productReviewActions;