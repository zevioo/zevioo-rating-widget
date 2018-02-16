import React from 'react';
import '../../../index.css';

const productReviewActions = (props) => {
    return (
        <div className="zevioo-product-review-actions">
        <div className="zevioo-button zevioo-ask">
            <span className="zevioo-button-icon"></span>
            <span className="zevioo-button-text"> Ερώτηση </span>
        </div>
        <div className="zevioo-button zevioo-make-review" onClick={props.click}>
            <span className="zevioo-button-icon"></span>
            <span className="zevioo-button-text"> Αξιολόγηση </span>
        </div>
        </div>
    )

}

export default productReviewActions;