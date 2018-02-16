import React, {Component} from 'react';
import '../../../index.css';
import {percentage,filterReview} from '../../../helpers/Helpers'



class ReviewList extends Component {
        
    state = {
            currentPage: 1,
            lastPager: null, //click
            showReviews:2,
            loadReviews: 2, //click
            showLoadMore: true
        };

      pageHandleClick(e) {
        this.setState({
          currentPage: Number(e.target.id)
        });
      }




render(){

    const filterNum = this.props.filterNum;
    const isFilter = this.props.isFilter;
    let filteredReviews = null;
    if (isFilter) {
        filteredReviews = this.props.reviews.filter(filterReview(filterNum));
    }else {
        filteredReviews = this.props.reviews
    }



    const {currentPage, loadReviews } = this.state;

        // Logic for displaying current reviews
        const indexOfLastReview = currentPage * loadReviews;
        const currentReviews = filteredReviews.slice(0, indexOfLastReview);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredReviews.length / loadReviews); i++) {
            pageNumbers.push(i);
        }
        // Next Pager Func
        const pageNextHandleClick = (e) => {
            const currentPager = this.state.currentPage
            const lastPager = Math.ceil(filteredReviews.length / loadReviews);
            if (currentPager < lastPager){
              this.setState({
                  currentPage: currentPager + 1,
                  lastPager: lastPager
              })
            }
        }

        // render Value And Quality Bars 
        const bars = (val, position) => {
            if (val.length > 0){
                return (
                    <div className="zevioo-review-bar">
                        <div className="zevioo-review-bar-title">
                            <p>{val[position].NM}</p>
                        </div>
                        <div className="zevioo-review-bar-box">
                            <div className="zevioo-product-bar-box">
                                <div className="zevioo-score-graph">
                                    <div className="zevioo-progress-score" style={{width: percentage(val[position].RT, 5)+'%'}}></div>
                                </div>
                                <div className="zevioo-star-value"><span> {val[position].RT} </span></div>
                            </div>
                        </div>
                    </div>
                )
            }else {
                return null;
            }
        }

        return (
            <div className="zevioo-product-review">
                <div className="zevioo-action-filter">
                    <h3 className="zevioo-h3">Recent reviews</h3>
                </div>
                <div className="zevioo-reviews-list">
                {currentReviews.map((review,index) => {
                    return (
                       <div key={index} className="zevioo-single-review" > 
                       <div className="zevioo-single-review-header zevioo-clearfix">
                           <div className="zevioo-pull__left">
                               <div className="zevioo-icon" style={{display: 'none'}}>
                                   <label className="zevioo-user-letter">
                                   {review.FN.charAt(0)}
                                   </label>
                                   <span className="zevioo-check-small">✓</span>
                               </div>
                               <h2 className="zevioo-review-title">
                               {review.TT}
                               </h2>
                               <div className="zevioo-star-ratings">
                                   <div className="zevioo-star-ratings-top" style={{width: percentage(review.RT ,5)+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                                   <div className="zevioo-star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                               </div>
                               
                           </div>
                           <div className="zevioo-pull__right">
                               <div className="zevioo-review-date">
                               {review.DT.slice(0, 10)}
                               </div>
                               <div className="zevioo-buyer-info">
                               <div className="zevioo-buyer-name">
                               {review.FN + " " + review.LN}
                               </div>
                           
                               <div className="zevioo-verify-buyer">
                                   <span>{(review.CPF === true) ? "Verified Buyer" : " "} </span>
                               </div>
                            </div>
                           </div>
                       </div>
                       <div className="zevioo-single-review-body">
                           <div className="zevioo-review-content">
                               <div className="zevioo-review-pn">
                                   <p className="zevioo-review-positive">
                                   <span className="zevioo-positive"> {review.PT ? '+' : ''} </span><span> {review.PT} </span>
                                   </p>
                                   <p className="zevioo-review-negative">
                                   <span className="zevioo-negative"> {review.PT ? '-' : ''} </span><span> {review.NT} </span>
                                   </p>
                               </div>
                               <div className="zevioo-review-bars">
                                    {bars(review.KM, 0)}
                                    {bars(review.KM, 1)}
                               </div>
                               </div>
                           </div>
                     </div>
                    )
                })}
                </div>
                <div className="zevioo-paggination">
                    <div id="zevioo-pager">
                        {(this.state.lastPager !== this.state.currentPage) ? <a onClick={(e) => pageNextHandleClick(e)} >Load More</a> : ''}
                    </div>
                </div>
            </div>
        );
    }
}
export default ReviewList;