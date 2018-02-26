import React, {Component} from 'react';
import '../../../index.css';
import Aux from '../../../hoc/Aux';
import {percentage,filterReview,dateToDay} from '../../../helpers/Helpers';
import ThumbsForm from '../Forms/ThumbsForm';
import Verify from '../../../components/Svg/verify';



class ReviewList extends Component {
        
    state = {
            currentPage: 1,
            lastPager: null, //click
            showReviews:2,
            loadReviews: 2, //click
            showLoadMore: true,
            sortValue: 'new'
        };

      pageHandleClick(e) {
        this.setState({
          currentPage: Number(e.target.id)
        });
      }

render(){
        const verifyIcon = ( 
            <Aux> 
            <span className="zevioo-verify__icon">
            <Verify
            width="20px"
            height="20px"
            fill="var(--green)"
            stroke="var(--green)"
            strokeWidth= "5px" />
            </span>                             
            <span className="zevioo-verify__text">Επιβεβαιωμένη αγορά</span>
            </Aux> 

        )

        //Sort reviews
        const handleChange = (e) => {
            e.preventDefault()
            this.setState({sortValue: e.target.value});

        }

        const sortedValue = this.state.sortValue;
        let sortedReviews = null;
        if (sortedValue === 'new') {
            sortedReviews = (a,b) => {
                const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
                const d1 = new Date(convertDigitIn(a.DT));
                const d2 = new Date(convertDigitIn(b.DT));
                if (d1  > d2) {return -1;}
                if (d1  < d2) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'older'){
            sortedReviews = (a,b) => {
                const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
                const d1 = new Date(convertDigitIn(a.DT));
                const d2 = new Date(convertDigitIn(b.DT));

                if (d1 < d2) {return -1;}
                if (d1 > d2) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'text'){
            sortedReviews = (a,b) => {
                const x = a.TT.length;
                const y = b.TT.length;
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
            }
        }else if (sortedValue === 'better'){
            sortedReviews = (a,b) => b.RT - a.RT
        }else if (sortedValue === 'worst'){
            sortedReviews = (a,b) => a.RT - b.RT
        }

        // Filter Reviews
        const filterNum = this.props.filterNum;
        const isFilter = this.props.isFilter;
        let filteredReviews = null;
        if (isFilter) {
            filteredReviews = this.props.reviews.filter(filterReview(filterNum)).sort(sortedReviews);
        }else {
            filteredReviews = this.props.reviews.sort(sortedReviews)
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
                    <div className="zevioo-product-score-bar">
                        <div className="zevioo-product-bar-title">
                            <p>{val[position].NM}</p>
                        </div>
                        <div className="zevioo-product-bar-box">
                            <div className="zevioo-score-graph">
                                <div className="zevioo-progress-score" style={{width: percentage(val[position].RT, 5)+'%'}}></div>
                            </div>
                            <div className="zevioo-bar-value"><span> {val[position].RT} </span></div>
                        </div>
                    </div>
                )
            }else {
                return null;
            }
        }

        const exportReviews = currentReviews.map((review,index) => {
            return (
               <div key={index} itemProp="review" itemScope itemType="http://schema.org/Review" className="zevioo-single-review" > 
               <div className="zevioo-single-review-header zevioo-clearfix">
                   <div className="zevioo-pull__left">
                       <h2 itemProp="name" className="zevioo-review-title">
                       {review.TT}
                       </h2>
                       <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating" className="zevioo-star-ratings">
                           <div className="zevioo-star-ratings-top" style={{width: percentage(review.RT ,5)+'%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                           <div className="zevioo-star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                           <span className="zevioo-none" itemProp="ratingValue">{review.RT}</span>
                           <span className="zevioo-none" itemProp="bestRating">5</span>
                       </div>
                       
                   </div>
                   <div className="zevioo-pull__right">
                   {(review.CPF === true) && 
                    <div className="zevioo-verify-buyer">
                        {verifyIcon }
                     </div>
                    }
                       <div itemProp="datePublished" content={review.DT} className="zevioo-review-date">
                       {dateToDay(review.DT)}
                       </div>
                       <div className="zevioo-buyer-info">
                       <div className="zevioo-buyer-name">
                        Από: {review.FN + " " + review.LN}
                       </div>
                    </div>
                   </div>
               </div>
               <div className="zevioo-single-review-body">
                   <div itemProp="reviewBody" className="zevioo-review-content">
                       <div className="zevioo-review-pn">
                       {review.PT &&
                           <p className="zevioo-review-positive">
                           <span className="zevioo-positive"> + </span><span> {review.PT} </span>
                           </p>
                       }
                       {review.NT &&
                           <p className="zevioo-review-negative">
                           <span className="zevioo-negative"> {review.NT ? '-' : ''} </span><span> {review.NT} </span>
                           </p>
                       }
                       </div>
                       <div className="zevioo-container__flex ">
                            <div className="zevioo-review-bars">
                                    {bars(review.KM, 1)}
                                    {bars(review.KM, 0)}
                                    
                            </div>
                            <ThumbsForm 
                                likeCount={review.LCN} 
                                dislikeCount={review.DCN}
                                reviewId={review.ID}/>
                       </div>
                    </div>
                </div>
                <span className="zevioo-none" itemProp="publisher" itemScope itemType="http://schema.org/Organization">
                <meta itemProp="name" content="zevioo" />
                </span>
             </div>
            )
        })

        const exportReviewComponent = (

            <div className="zevioo-product-review">
                <div className="zevioo-action-filter">
                    <div className="zevioo-filter__review">
                        <span className="zevioo-reviews__btn-active" onClick={this.props.displayReviewsClick}>Αξιολογήσεις ({this.props.reviewsHeader.RC})</span>
                        {this.props.showQuestionsTab ? <span className="zevioo-questions__btn" onClick={this.props.displayQuestionsClick}>Ερωτήσεις ({this.props.questionCount})</span> : ''}
                    </div>
                    <div className="zevioo-filter__dropdown">
                        <label className="zevioo-dropdown__label">
                        Ταξινόμηση:
                        </label>
                        <select className="zevioo-select__first" value={this.state.value} onChange={(e) => handleChange(e)}>
                            <option value="new">Πιό πρόσφατη</option>
                            <option value="older">Πιό παλία</option>
                            <option value="text">Με τίτλο</option>
                            <option value="better">Καλύτερη</option>
                            <option value="worst">Χειρότερη</option>
                        </select>
                    </div>
                </div>
                <div className="zevioo-reviews-list">
                {exportReviews}
                </div>
                <div className="zevioo-paggination">
                    <div id="zevioo-pager">
                        {(this.state.lastPager !== this.state.currentPage && this.props.reviews.length > 2 ) ? <a onClick={(e) => pageNextHandleClick(e)} >Περισσότερες αξιολογήσεις</a> : ''}
                    </div>
                </div>
            </div>
        );


        return (
            <Aux>
                {exportReviewComponent}
            </Aux>
            
        )
    }
}
export default ReviewList;