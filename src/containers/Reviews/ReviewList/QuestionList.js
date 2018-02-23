import React, {Component} from 'react';
import '../../../index.css';
import {dateToDay} from '../../../helpers/Helpers';


class QuestionList extends Component {
        
    state = {
            currentPage: 1,
            lastPager: null, //click
            showQuestions:2,
            loadQuestions: 2, //click
            showLoadMore: true,
            sortValue: 'new'
        };

      pageHandleClick(e) {
        this.setState({
          currentPage: Number(e.target.id)
        });
      }

render(){

    const questions = this.props.questions;


    //Sort reviews
    const handleChange = (e) => {
        e.preventDefault()
        this.setState({sortValue: e.target.value});
        console.log(e.target.value, this.state)
    }

    const sortedValue = this.state.sortValue;
    let sortedQuestions = null;
    if (sortedValue === 'new') {
        sortedQuestions  = (a,b) => {
            const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
            const d1 = new Date(convertDigitIn(a.CD));
            const d2 = new Date(convertDigitIn(b.CD));
            if (d1  > d2) {return -1;}
            if (d1  < d2) {return 1;}
            return 0;
        }
    }else if (sortedValue === 'older'){
        sortedQuestions  = (a,b) => {
            const convertDigitIn = (date) => date.slice(0, 10).split('/').reverse().join('/');
            const d1 = new Date(convertDigitIn(a.CD));
            const d2 = new Date(convertDigitIn(b.CD));
            if (d1 < d2) {return -1;}
            if (d1 > d2) {return 1;}
            return 0;
        }
    }


    const {currentPage, loadQuestions } = this.state;

    // Logic for displaying current reviews
    const indexOfLastReview = currentPage * loadQuestions;
    const currentQuestion = questions.sort(sortedQuestions).slice(0, indexOfLastReview);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(questions.length / loadQuestions); i++) {
        pageNumbers.push(i);
    }
    // Next Pager Func
    const pageNextHandleClick = (e) => {
        const currentPager = this.state.currentPage
        const lastPager = Math.ceil(questions.length / loadQuestions);
        if (currentPager < lastPager){
          this.setState({
              currentPage: currentPager + 1,
              lastPager: lastPager
          })
        }
    }

    const exportQuestions = currentQuestion.map((question,index) => {
        return (
           <div key={index} className="zevioo-single-question" > 
           <div className="zevioo-single-question-header zevioo-clearfix">
               <div className="zevioo-pull__left">
                   <h2 className="zevioo-question-title">
                   {question.QT}  <span>({question.ACT} Answer)</span>
                   </h2>
                   
               </div>
               <div className="zevioo-pull__right">
                   <div className="zevioo-question-date">
                   {dateToDay(question.CD)}
                   </div>
                   <div className="zevioo-buyer-info">
                   <div className="zevioo-buyer-name">
                   {question.FN}
                   </div>
               
                   <div className="zevioo-verify-buyer">
                       <span>"Verified Buyer" </span>
                   </div>
                </div>
               </div>
           </div>
           <div className="zevioo-single-question-body">
                <div className="zevioo-question-content">
                    <div className="zevioo-question-icon">
                        <label className="zevioo-question-logo">
                        t
                        </label>
                    </div>
                    <div className="zevioo-question-reply" > 
                        Hi Katerina,
                        Thank you for choosing our products. Yes you can. However, if your skin is very dry, you
                        should better try the Extra Dry variant, by following this link.</div>
                    </div>
               </div>
         </div>
        )
    })

    const exportQuestionsComponent = (

        <div className="zevioo-product-review">
            <div className="zevioo-action-filter">
                <div className="zevioo-filter__review">
                    <span className="zevioo-reviews__btn" onClick={this.props.displayReviewsClick}>Αξιολογήσεις ({this.props.reviewsHeader.RC})</span>
                    <span className="zevioo-questions__btn-active" onClick={this.props.displayQuestionsClick}>Ερωτήσεις ({questions.length})</span>
                </div>
                <div className="zevioo-filter__dropdown">
                    <label className="zevioo-dropdown__label">
                    Ταξινόμηση:
                    </label>
                    <select className="zevioo-select__first" value={this.state.value} onChange={(e) => handleChange(e)}>
                        <option value="new">Πιό πρόσφατη</option>
                        <option value="older">Πιό παλία</option>
                    </select>
                </div>
            </div>
            <div className="zevioo-questions-list">
            {exportQuestions}
            </div>
            <div className="zevioo-paggination">
                <div id="zevioo-pager">
                    {(this.state.lastPager !== this.state.currentPage) ? <a onClick={(e) => pageNextHandleClick(e)} >Περισσότερες ερωτήσεις</a> : ''}
                </div>
            </div>
        </div>
    );

    console.log(this.props.questions)
return (
        <div>
        {exportQuestionsComponent}
        </div>
    )

    }
}
export default QuestionList;