import React from 'react';
import '../../index.css';

import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductRatingBars from './Header/ProductRatingBars';

import ProductScoreBars from './Header/ProductScoreBars';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeader = (props) => {
    // const statsArray = [].concat(props.obj)
        return (
            <div className="zevioo-product-review">
                <div className="zevioo-product-rating zevioo-clearfix">
                    <ProductRatingAvg 
                        OR={props.obj.OR}
                        RC={props.obj.RC}
                        />
                    <ProductScoreBars 
                        stars={props.obj}
                        click={props.filterClick}
                        />
                    <ProductRatingBars 
                        qualityRT={props.obj.qualityRT}
                        valueRT={props.obj.valueRT}
                    />
                    <ProductReviewActions 
                        clickReview={props.writeReviewClick}
                        clickQuestion={props.askQuestionClick}
                        showQuestionsTab={props.showQuestionsTab}
                        {...props} />
                </div>
            </div>
        );
}

export default reviewsHeader;