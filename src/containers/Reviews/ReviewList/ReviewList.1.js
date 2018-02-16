import React, {Component} from 'react';
import '../../../index.css';
import {percentage,reviewBar,filterReview} from '../../../helpers/Helpers'



class ReviewList extends Component {
        
    state = {
            currentPage: 1, //click
            reviewsPerPage: 5, //click
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



    const {currentPage, reviewsPerPage } = this.state;

        // Logic for displaying current reviews
        const indexOfLastReview = currentPage * reviewsPerPage;
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
        const currentReviews = filteredReviews.slice(0, indexOfLastReview);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredReviews.length / reviewsPerPage); i++) {
            pageNumbers.push(i);
        }
        // Prv Pager Func 
       const pagePrevHandleClick = (e) => {
            const currentPager = this.state.currentPage
            if (currentPager > 1){
              this.setState({
                  currentPage: currentPager - 1
              })
            }
        }
        // Next Pager Func
        const pageNextHandleClick = (e) => {
            const currentPager = this.state.currentPage
            const lastPager = Math.ceil(filteredReviews.length / reviewsPerPage);
            if (currentPager < lastPager){
              this.setState({
                  currentPage: currentPager + 1
              })
            }
        }


        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <span
                key={number}
                id={number}
                className="zevioo-pager-item"
                onClick={(e) => this.pageHandleClick(e)}
              >
                {number}
              </span>
            );
          });

        return (
            <div>
            <h3 className="zevioo-h3">Recent reviews</h3>
            <div className="product-review portlet">
                <div className="reviews-list">
                {currentReviews.map((review,index) => {
                    return (
                       <div key={index} className="single-review review-star-{review.RT}" > 
                       <div className="single-review-header clearfix">
                           <div className="zevioo-pull__left">
                               <div className="zevioo-icon" style={{display: 'none'}}>
                                   <label className="zevioo-user-letter">
                                   {review.FN.charAt(0)}
                                   </label>
                                   <span className="zevioo-check-small">✓</span>
                               </div>
                               <h2 className="review-title">
                               {review.TT}
                               </h2>
                               <div className="star-ratings">
                                   <div className="star-ratings-top" style={{width: percentage(review.RT ,5)+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                                   <div className="star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                               </div>
                               
                           </div>
                           <div className="zevioo-pull__right">
                               <div className="zevioo-review-date">
                               {review.DT.slice(0, 10)}
                               </div>
                               <div className="zevioo-buyer-info">
                               <div className="buyer-name">
                               {review.FN + " " + review.LN}
                               </div>
                           
                               <div className="zevioo-verify-buyer">
                                   <span>{(review.CPF === true) ? "Verified Buyer" : " "} </span>
                               </div>
                            </div>
                           </div>
                       </div>
                       <div className="single-review-body">
                           <div className="review-content">
                               <div className="review-pn">
                                   <p className="review-positive">
                                   <span className="zevioo-positive"> {review.PT ? '+' : ''} </span><span> {review.PT} </span>
                                   </p>
                                   <p className="review-negative">
                                   <span className="zevioo-negative"> {review.PT ? '-' : ''} </span><span> {review.NT} </span>
                                   </p>
                               </div>
                               <div className="review-bars">
                                   <div className="review-bar">
                                       <div className="review-bar-title">
                                           <p>{review.KM.length > 0 ? review.KM[0].NM : '' }</p>
                                       </div>
                                       <div className="review-bar-box">
                                       {review.KM.length > 0 ? reviewBar(review.KM[0].RT) : '' }
                                       </div>
                                   </div>
                                   <div className="review-bar">
                                   <div className="review-bar-title">
                                       <p>{review.KM.length > 0 ? review.KM[1].NM : '' }</p>
                                   </div>
                                   <div className="review-bar-box">
                                   {review.KM.length > 0 ? reviewBar(review.KM[1].RT) : '' }
                                   </div>
                               </div>
                               </div>
                               </div>
                           </div>
                     </div>
                    )
                })}
                </div>
                <div className="zevioo-paggination">
                    <div id="zevioo-pager">
                       
                        <button onClick={(e) => pageNextHandleClick(e)} >Load More</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default ReviewList;