import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Aux';



import ReviewsHeader from './ReviewsHeader';
import ReviewList from '../Reviews/ReviewList/ReviewList';
import QuestionList from '../Reviews/ReviewList/QuestionList';
import WriteReview from '../Reviews/Forms/WriteReview';
import Loading from '../../components/Loading/Loading';
import AskQuestion from '../Reviews/Forms/AskQuestion';




class Reviews extends Component {

    state = {
        headerStats: [],
        stars: [],
        reviews: [],
        questions:[],
        QE: false,
        loading: true,
        haveReviews: false,
        writeReview: false,
        askQuestions: false,
        filterReview: false,
        filterReviewNum: 5,
        displayReviews: true,
        displayQuestions: false
    };

    
    componentDidMount() {
        const render = document.getElementById('zevioo-reviews');
        const USR = render.getAttribute('data-usr');
        const PSW = render.getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');

        axios.post('/getreviews', {
            USR: USR,
            PSW: PSW,
            EAN: EAN
        })
             .then(response => {
               const obj = response.data;
               const reviews = obj.RL;
               const questions = obj.QL;
               const updatedQuestions = [...questions]
               const updatedReviews = [...reviews]
               const updatedObj = {...obj}

               if(obj.RL.length > 0 ){ //Check if we have a list of reviews
                this.setState({
                 reviews: updatedReviews,
                 QE: false,
                 headerStats: {
                     OR: updatedObj.OR,
                     RC: updatedObj.RC,
                     qualityRT: updatedObj.OKM[0].RT,
                     valueRT: updatedObj.OKM[1].RT,
                     oneRC: updatedObj.RCL[0].RC,
                     oneRT: updatedObj.RCL[0].RT,
                     twoRC: updatedObj.RCL[1].RC,
                     twoRT: updatedObj.RCL[1].RT,
                     threeRC: updatedObj.RCL[2].RC,
                     threeRT: updatedObj.RCL[2].RT,
                     fourRC: updatedObj.RCL[3].RC,
                     fourRT: updatedObj.RCL[3].RT,
                     fiveRC: updatedObj.RCL[4].RC,
                     fiveRT: updatedObj.RCL[4].RT,
                     totalReviews: updatedObj.RC
                 },
                 questions: updatedQuestions,
                 loading: false,
                 haveReviews: true
                 })
               } else {
                   this.setState({
                    loading: false,
                    haveReviews: false
                   })
               }
             })
             };

             askQuestionsHandler = (e) => {
                 e.preventDefault();
                 this.setState({
                    askQuestions: !this.state.askQuestions,
                    writeReview: false
                 })
             }

            writeReviewHandler = ( e ) => {
                e.preventDefault();                
                this.setState({
                    writeReview: !this.state.writeReview,
                    askQuestions: false
                })
            }

            filterHandlerClick( e ) {
                e.preventDefault();
                let filterVal = e.target.closest('.zevioo-clickable').getAttribute('data-star')

                
                this.setState({
                    filterReview: true,
                    filterReviewNum: parseInt(filterVal, 10)
                })
              }


            // Display Reviews And Questions Handlers
            displayReviewsHandler = (e) => {
                e.preventDefault();
                this.setState({
                    displayReviews: true,
                    displayQuestions: false

                    })
                }
                displayQuestionsHandler = (e) => {
                    e.preventDefault();
                    this.setState({
                        displayReviews: false,
                        displayQuestions: true
    
                        })
                    }

    render() {
        let toRender = null;
        if (this.state.loading) {
            toRender = <Loading />;
        } else {
            if(this.state.haveReviews === false){
                return (
                    <div>
                        <h2>
                        No Reviews
                        </h2>
                    </div>
                )
            }
            return (
                <Aux>
                <h3 className="zevioo-h3">
                Αυθεντικές αξιολογήσεις 
                <span className="zevioo-title">από το 
                <img src='https://zevioo.com/widgets/media/Logo.svg' className="zevioo-logo" alt="zevioo logo" height="16px"/>
                </span> 
                </h3>
                <ReviewsHeader 
                headerStats={this.state.headerStats} 
                    writeReviewClick={( e )=> this.writeReviewHandler(e)}
                    askQuestionClick={( e )=> this.askQuestionsHandler(e)}
                    filterClick={( e )=> this.filterHandlerClick(e)}
                    reviewBtn={this.state.writeReview}
                    questionBtn={this.state.askQuestions}
                    showQuestionsTab = {this.state.QE}
                    />
                {this.state.writeReview? <WriteReview click={( e )=> this.writeReviewHandler(e)}/> : null }
                
                {this.state.askQuestions? <AskQuestion click={( e )=> this.askQuestionsHandler(e)}/> : null }

                {this.state.displayReviews ?
                    <ReviewList 
                        reviewsHeader={this.state.headerStats}
                        reviews={this.state.reviews}
                        questionCount={this.state.questions.length}
                        isFilter={this.state.filterReview}
                        filterNum={this.state.filterReviewNum}
                        displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                        displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                        showQuestionsTab = {this.state.QE}
                    /> : null }
                
                {this.state.displayQuestions && this.state.QE ? 
                    <QuestionList 
                        reviewsHeader={this.state.headerStats}
                        questions={this.state.questions}
                        displayReviewsClick={( e )=> this.displayReviewsHandler(e)}
                        displayQuestionsClick={( e )=> this.displayQuestionsHandler(e)}
                    />: null }
                </Aux>
            )
        }
        return (
            <Aux>
                {toRender}
            </Aux>
        );
    }
}

export default Reviews;