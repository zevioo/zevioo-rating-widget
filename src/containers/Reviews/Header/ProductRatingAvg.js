import React from 'react';
import '../../../index.css';

const productRatingAvg = (props) => {
    return (
        
        <div className="zevioo-rating__avg">
            <div itemProp="ratingValue" className="zevioo-avg-text">{props.OR.toFixed(1)}<span itemProp="bestRating"> από 5 </span> </div>
            <div itemProp="ratingCount" className="zevioo-counter__text">{props.RC} αξιολογήσεις</div>
        </div>
    )
}
export default productRatingAvg;