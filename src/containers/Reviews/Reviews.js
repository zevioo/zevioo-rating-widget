import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Aux';


import ReviewsHeader from './ReviewsHeader';
import ReviewList from '../Reviews/ReviewList/ReviewList';
import WriteReview from '../Reviews/Forms/WriteReview';
import Loading from '../../components/Loading/Loading'



class Reviews extends Component {

    state = {
        obj: [],
        stars: [],
        reviews: [],
        loading: true,
        writeReview: false,
        filterReview: false,
        filterReviewNum: 5
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
               const updatedReviews = [...reviews]
               const updatedObj = {...obj}
               console.log(updatedReviews, updatedObj)
               this.setState({
                reviews: updatedReviews,
                obj: {
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
                loading: false
                })
             })
             };

            writeReviewHandler = ( e ) => {
                e.preventDefault();                
                this.setState({
                    writeReview: !this.state.writeReview
                })
            }

            filterHandlerClick( e ) {
                e.preventDefault();
                let filterVal = e.target.closest('.zevioo-clickable').getAttribute('data-star')
                console.log(typeof filterVal, filterVal)
                
                this.setState({
                    filterReview: true,
                    filterReviewNum: parseInt(filterVal, 10)
                })
              }


    render() {
        
        let toRender = null;
        if (this.state.loading) {
            toRender = <Loading />;
        } else {
            return (
                <Aux>
                <ReviewsHeader 
                    obj={this.state.obj} 
                    writeReviewClick={( e )=> this.writeReviewHandler(e)}
                    filterClick={( e )=> this.filterHandlerClick(e)}
                    />
                {this.state.writeReview? <WriteReview click={( e )=> this.writeReviewHandler(e)}/> : null }
                <ReviewList 
                    reviews={this.state.reviews}
                    isFilter={this.state.filterReview}
                    filterNum={this.state.filterReviewNum}
                    />
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