import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import {userStarRating, userQualityRating, userValueRating} from'../../../helpers/Helpers';
import Loading from '../../../components/Loading/Loading';
import Close from '../../../components/Svg/close.svg';

class WriteReview extends Component {
    state = {
        reviewForm: {
            rating: {
                elementType: 'radio',
                elementConfig: {
                    label: '★',
                    className: 'zevioo-add-rating',
                    options: [
                        {id: 'star1', labelId: 'star-input-1', name: 'rating', displayValue: '1'},
                        {id: 'star2', labelId: 'star-input-2', name: 'rating', displayValue: '2'},
                        {id: 'star3', labelId: 'star-input-3', name: 'rating', displayValue: '3'},
                        {id: 'star4', labelId: 'star-input-4', name: 'rating', displayValue: '4'},
                        {id: 'star5', labelId: 'star-input-5', name: 'rating', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            positiveReview: {
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-positive-review',
                    name: 'positive_review',
                    maxLength: '300',
                    className: 'zevioo-form-input',
                    type: 'text',
                    placeholder: 'Γράψτε εδώ τι σας άρεσε περισσότερο ...'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 300,
                },
                valid: true
            },
            negativeReview: {
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-negative-review',
                    name: 'negative_review',
                    maxLength: '300',
                    className: 'zevioo-form-input',
                    type: 'text',
                    placeholder: 'Γράψτε εδώ τι δεν σας άρεσε ...'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 300,
                },
                valid: true
            },
            qualityBox: {
                elementType: 'radio',
                elementConfig: {
                    label: '★',
                    className: 'zevioo-add-rating',
                    options: [
                        {id: 'quality-1', labelId: 'quality-input-1', name: 'quality', displayValue: '1'},
                        {id: 'quality-2', labelId: 'quality-input-2', name: 'quality', displayValue: '2'},
                        {id: 'quality-3', labelId: 'quality-input-3', name: 'quality', displayValue: '3'},
                        {id: 'quality-4', labelId: 'quality-input-4', name: 'quality', displayValue: '4'},
                        {id: 'quality-5', labelId: 'quality-input-5', name: 'quality', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            valueBox: {
                elementType: 'radio',
                elementConfig: {
                    label: '★',
                    className: 'zevioo-add-rating',
                    options: [
                        {id: 'value-1', labelId: 'value-input-1', name: 'value', displayValue: '1'},
                        {id: 'value-2', labelId: 'value-input-2', name: 'value', displayValue: '2'},
                        {id: 'value-3', labelId: 'value-input-3', name: 'value', displayValue: '3'},
                        {id: 'value-4', labelId: 'value-input-4', name: 'value', displayValue: '4'},
                        {id: 'value-5', labelId: 'value-input-5', name: 'value', displayValue: '5'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            titleReview: {
                
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-title-review',
                    className: 'zevioo-form-input',
                    name: 'title_review',
                    type: 'text',
                    maxLength: '150'
                },
                value: '',
                validation: {
                    required: false,
                    maxLength: 150,
                },
                valid: true
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    id: 'user_firstname',
                    className: 'zevioo-form-input user-name',
                    name: 'user_firstname',
                    placeholder: 'Όνομα'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    id: 'user_lastname',
                    className: 'zevioo-form-input user-name',
                    name: 'user_lastname',
                    placeholder: 'Επίθετο'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    id: 'user_email',
                    className: 'zevioo-form-input user-name',
                    name: 'review_user_email', 
                    required: true,
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            age: {
                elementType: 'number',
                elementConfig: {
                    className: 'zevioo-form-input user-age',
                    name: 'year_birth', 
                    required: true,
                    id: 'user_year'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        showSuccess: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.reviewForm) {
            formData[formElementIdentifier] = this.state.reviewForm[formElementIdentifier].value;
        }
        const render = document.getElementById('zevioo-reviews');
        const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
        const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');
        console.log(USR, PSW, EAN)
        const reviewForm = this.state.reviewForm;
        
        const zeviooDate = () => {
            let today = new Date();
            let date = today.toLocaleDateString();
            let time = today.toLocaleTimeString();
            let val = date + " " + time ;
            return val;
        };
        const userAge = (input) => {
            const year = new Date().getFullYear();
            const BirthYear = input;
            let val = '';
            (BirthYear.length > 1) ? val = year - BirthYear : val = "";
            return val;  
        }
        const thisDate = zeviooDate();
        const newReview = JSON.stringify({
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            EML: reviewForm.email.value,
            FN: reviewForm.firstName.value,
            LN: reviewForm.lastName.value,
            GD: reviewForm.gender.value,
            AG: userAge(reviewForm.age.value),
            DT: thisDate,
            RT: reviewForm.rating.value,
            TT: reviewForm.titleReview.value,
            NT: reviewForm.negativeReview.value,
            PT: reviewForm.positiveReview.value,
            KM: [{
                    NM: "Value for money",
                    RT: reviewForm.valueBox.value
                },
                {
                    NM: "Ποιότητα",
                    RT: reviewForm.qualityBox.value
                }
            ],

        })
        console.log(newReview)
        axios.post( '/savereview', newReview )
        .then( response => {
            console.log(response)
            this.setState( { loading: false, showSuccess: true  } );
            this.setState(this.state);

        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
    }
    componentDidMount(){
        userStarRating();
        userQualityRating();
        userValueRating();
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedReviewForm = {
            ...this.state.reviewForm
        };
        const updatedFormElement = { 
            ...updatedReviewForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedReviewForm[inputIdentifier] = updatedFormElement;
        
        

        let formIsValid = true;
        for (let inputIdentifier in updatedReviewForm) {
            formIsValid = updatedReviewForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({reviewForm: updatedReviewForm, formIsValid: formIsValid});
    }

    render() {
        if (this.state.loading) {
            return <Loading />
         }
        if (this.state.showSuccess) {
            return (
                <div className="zevioo-form__success">
                    <div className="zevioo-close-icons" onClick={this.props.click}><img src={Close} className="zevioo-close-svg" alt="zevioo Close"/></div>
                    <div className="zevioo-success-title">Thank you!</div>
                    <div className="zevioo-success-subTitle">
                        We’ve just sent you an email. Please confirm your email account by
                        clicking on the confirmation link and your Question will be published.
                    </div>
                </div>
            )
        }

        return (
            <div className="zevioo-write-review-wrapper">
                <div className="zevioo-write-review-box">
                <form id="zevioo-review-form" onSubmit={this.orderHandler}>
                    <div className="zevioo-write-review-header">
                        <div className="zevioo-rating-group">
                            <label className="zevioo-label-big zevioo-rating-title">
                                Τι βαθμολογία θα του δίνατε συνολικά; 
                            </label>
                            <Input 
                                elementType={this.state.reviewForm.rating.elementType}
                                elementConfig={this.state.reviewForm.rating.elementConfig}
                                value={this.state.reviewForm.rating.value}
                                changed={(event) => this.inputChangedHandler(event, 'rating')}
                                 />
                        </div>
                        <div className="zevioo-rating__quality__money">
                        <div className="zevioo-rating-group">
                            <label className="zevioo-label-small zevioo-rating-title">
                                Ποιότητα 
                            </label>
                            <Input 
                                elementType={this.state.reviewForm.qualityBox.elementType}
                                elementConfig={this.state.reviewForm.qualityBox.elementConfig}
                                value={this.state.reviewForm.qualityBox.value}
                                changed={(event) => this.inputChangedHandler(event, 'qualityBox')}
                               />
                        </div>
                        <div className="zevioo-rating-group">
                            <label className="zevioo-label-small zevioo-rating-title">
                                Αξίζει τα λεφτά του
                            </label>
                            <Input 
                                elementType={this.state.reviewForm.valueBox.elementType}
                                elementConfig={this.state.reviewForm.valueBox.elementConfig}
                                value={this.state.reviewForm.valueBox.value}
                                changed={(event) => this.inputChangedHandler(event, 'valueBox')}
                                />
                        </div>
                    </div>
                    </div>

                    <div className="zevioo-write-review-body">
                        <div className="zevioo-form">
                            <div className="zevioo-form-group__flex">
                                <label className="zevioo-label-big zevioo-rating-title">
                                Τι τίτλο θα δίνατε στην αξιολόγηση σας;
                                </label>
                                <Input 
                                elementType={this.state.reviewForm.titleReview.elementType}
                                elementConfig={this.state.reviewForm.titleReview.elementConfig}
                                value={this.state.reviewForm.titleReview.value}
                                changed={(event) => this.inputChangedHandler(event, 'titleReview')} />
                            </div>
                            <div className="zevioo-form-group__flex">
                            <div className="zevioo-half__flex">
                                <Input 
                                    elementType={this.state.reviewForm.positiveReview.elementType}
                                    elementConfig={this.state.reviewForm.positiveReview.elementConfig}
                                    value={this.state.reviewForm.positiveReview.value}
                                    changed={(event) => this.inputChangedHandler(event, 'positiveReview')} />
                                <span className="zevioo-form-span">max. 300 χαρακτήρες</span>
                                </div>
                                <div className="zevioo-half__flex">
                                    <Input 
                                        elementType={this.state.reviewForm.negativeReview.elementType}
                                        elementConfig={this.state.reviewForm.negativeReview.elementConfig}
                                        value={this.state.reviewForm.negativeReview.value}
                                        changed={(event) => this.inputChangedHandler(event, 'negativeReview')} />
                                    <span className="zevioo-form-span">max. 300 χαρακτήρες</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="zevioo-write-review-footer">
                    <div className="zevioo-user-info zevioo-form">
                    <div className="zevioo-form-group__flex_end">
                        <div className="zevioo-half__flex_end">
                            <label className="zevioo-label-big">
                            Όνομα & αρχικό επιθέτου
                            </label>
                            <Input 
                            elementType={this.state.reviewForm.firstName.elementType}
                            elementConfig={this.state.reviewForm.firstName.elementConfig}
                            value={this.state.reviewForm.firstName.value}
                            changed={(event) => this.inputChangedHandler(event, 'firstName')} />
                        </div>
                        <div className="zevioo-half__flex_end">
                            <Input 
                            elementType={this.state.reviewForm.lastName.elementType}
                            elementConfig={this.state.reviewForm.lastName.elementConfig}
                            value={this.state.reviewForm.lastName.value}
                            changed={(event) => this.inputChangedHandler(event, 'lastName')} />
                        </div>
                        <div className="zevioo-half__flex_end">
                            <label className="zevioo-label-big">
                                Age
                            </label>
                            <Input 
                            elementType={this.state.reviewForm.age.elementType}
                            elementConfig={this.state.reviewForm.age.elementConfig}
                            value={this.state.reviewForm.age.value}
                            changed={(event) => this.inputChangedHandler(event, 'age')} />
                        </div>
                    </div>
                    <div className="zevioo-form-group">
                        <Input 
                        elementType={this.state.reviewForm.email.elementType}
                        elementConfig={this.state.reviewForm.email.elementConfig}
                        value={this.state.reviewForm.email.value}
                        changed={(event) => this.inputChangedHandler(event, 'email')} />
                    </div>
                    <div className="zevioo-form-group zevioo-flex__right">
                        <input type="submit" className="zevioo-button zevioo-color__btn" value="Publish" />
                    </div>
                </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }

}

export default WriteReview;
