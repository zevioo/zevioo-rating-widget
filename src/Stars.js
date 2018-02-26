import React, { Component } from 'react';
import axios from 'axios';
import {percentage} from './helpers/Helpers'
import StarIcon from './components/Svg/star'

class Stars extends Component {

    state = {
        rating: null,
        reviews: null,
        reviewsCounter: null
    };

    starSvgTransparent = <StarIcon 
    classs="zevioo-stars-tr"
    fill="transparent"
    stroke="var(--lightGray)"
    strokeWidth= "5px"/>
    
    starSvg = <StarIcon 
    classs="zevioo-stars-color"
    fill="var(--darkGray)"
    stroke="var(--darkGray)"
    strokeWidth= "5px"/>

    componentDidMount() {
        const render = document.getElementById('zevioo-rating');
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
               const updatedObj = {...obj}

                this.setState({
                    rating: updatedObj.OR,
                    reviews: updatedObj.RC,
                    reviewsCounter: updatedObj.RL.length
                 })
             })
             };

    render() {

            if(this.state.reviewsCounter <= 0){
                return null 
            }
            return (
                <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating" className="zevioo-star-rating">
                <span className="zevioo-rating-value" itemProp="ratingValue">{this.state.rating.toFixed(1)}</span>    
                    <div className="zevioo-stars-container">
                        <div className="zevioo-stars-up">
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                            <span>{this.starSvgTransparent}</span>
                        </div>
                        <div className="zevioo-stars-down" style={{width: percentage(this.state.rating,5)+'%'}}>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                            <span>{this.starSvg}</span>
                        </div>
                    </div>
                    <div itemProp="ratingCount" className="zevioo-rating-counter">{this.state.reviewsCounter} αξιολογήσεις </div>
                    <span className="zevioo-none" itemProp="bestRating">5</span>
                </div>
            );
    }
}

export default Stars;