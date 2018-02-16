import React from 'react';
import '../../../index.css';

const productRatingAvg = (props) => {
    return (
        
        <div className="zevioo-rating__avg">
            <div className="zevioo-avg-text">{props.OR}<span> από 5 </span> </div>
            <div className="zevioo-rating__counter">
            </div>
        </div>
    )
}
export default productRatingAvg;