import React from 'react';
import '../../index.css';
import Aux from '../../hoc/Aux'

import ProductRatingAvg from './Header/ProductRatingAvg';
import ProductRatingBars from './Header/ProductRatingBars';

import ProductScoreBars from './Header/ProductScoreBars';
import ProductReviewActions from './Header/ProductReviewActions';


const reviewsHeader = (props) => {
    // const statsArray = [].concat(props.headerStats)
        return (
            <Aux>
            <div itemScope itemType="http://schema.org/Product" className="zevioo-product zevioo-none" style={{display: 'none !important'}}>
                <img itemProp="image" src={props.product.IMG} alt={props.product.NM + " Image"} />
                <h2 itemProp="name">{props.product.NM}</h2>
            </div>
            <div className="zevioo-product-review">
                <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating" className="zevioo-product-rating">
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
            </Aux>
        );
}

export default reviewsHeader;