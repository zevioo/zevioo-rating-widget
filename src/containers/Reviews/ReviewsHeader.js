import React from 'react';
import '../../index.css';

import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductRatingBars from './Header/ProductRatingBars';

import ProductScoreBars from './Header/ProductScoreBars';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeader = (props) => {
    // const statsArray = [].concat(props.headerStats)
        return (
            <div className="zevioo-product-review">
                <div className="zevioo-product-rating">
                    <ProductRatingAvg 
                        OR={props.headerStats.OR}
                        RC={props.headerStats.RC}
                        />
                    <ProductScoreBars 
                        stars={props.headerStats}
                        click={props.filterClick}
                        />
                    <ProductRatingBars 
                        qualityRT={props.headerStats.qualityRT}
                        valueRT={props.headerStats.valueRT}
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