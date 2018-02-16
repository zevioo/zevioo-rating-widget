import React from 'react';
import '../../index.css';

import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductRatingBars from './Header/ProductRatingBars';

import ProductScoreBars from './Header/ProductScoreBars';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeader = (props) => {
        return (
            <div className="zevioo-product-review">
                <div className="zevioo-product-rating zevioo-clearfix">
                    <ProductRatingAvg 
                        OR={props.obj.OR}
                        />
                    <ProductScoreBars 
                        stars={props.obj}
                        RC={props.obj.RC}
                        click={props.filterClick}
                        />
                    <ProductRatingBars 
                        qualityRT={props.obj.qualityRT}
                        valueRT={props.obj.valueRT}
                    />
                    <ProductReviewActions click={props.writeReviewClick} />
                </div>
            </div>
        );
}

export default reviewsHeader;