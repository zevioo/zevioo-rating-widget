import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import {userStarRating, userQualityRating, userValueRating} from'../../../helpers/Helpers';

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
                    maxLength: '150',
                    placeholder: 'Τι τίτλο θα δίνατε στην αξιολόγηση σας;'
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
            gender: {
                elementType: 'select',
                elementConfig: {
                    className: 'zevioo-select',
                    name: 'user_gender', 
                    id: 'user_gender',
                    options: [
                        {value: 'Άνδρας', displayValue: 'Άνδρας'},
                        {value: 'Γυναίκα', displayValue: 'Γυναίκα'}
                    ]
                },
                value: 'Άνδρας',
                validation: {
                    required: false
                },
                valid: true
            },
            age: {
                elementType: 'select',
                elementConfig: {
                    className: 'zevioo-select',
                    name: 'year_birth', 
                    id: 'user_year',
                    options: [
                        {value: '2010', displayValue: '2010'},
                        {value: '2009', displayValue: '2009'},
                        {value: '2008', displayValue: '2008'},
                        {value: '2007', displayValue: '2007'},
                        {value: '2006', displayValue: '2006'},
                        {value: '2005', displayValue: '2005'},
                        {value: '2004', displayValue: '2004'},
                        {value: '2003', displayValue: '2003'},
                        {value: '2002', displayValue: '2002'},
                        {value: '2001', displayValue: '2001'},
                        {value: '2000', displayValue: '2000'},
                        {value: '1999', displayValue: '1999'},
                        {value: '1998', displayValue: '1998'},
                        {value: '1997', displayValue: '1997'},
                        {value: '1996', displayValue: '1996'},
                        {value: '1995', displayValue: '1995'},
                        {value: '1994', displayValue: '1994'},
                        {value: '1993', displayValue: '1993'},
                        {value: '1992', displayValue: '1992'},
                        {value: '1991', displayValue: '1991'},
                        {value: '1990', displayValue: '1990'},
                        {value: '1989', displayValue: '1989'},
                        {value: '1988', displayValue: '1988'},
                        {value: '1987', displayValue: '1987'},
                        {value: '1986', displayValue: '1986'},
                        {value: '1985', displayValue: '1985'},
                        {value: '1984', displayValue: '1984'},
                        {value: '1983', displayValue: '1983'},
                        {value: '1982', displayValue: '1982'},
                        {value: '1981', displayValue: '1981'},
                        {value: '1980', displayValue: '1980'},
                        {value: '1979', displayValue: '1979'},
                        {value: '1978', displayValue: '1978'},
                        {value: '1977', displayValue: '1977'},
                        {value: '1976', displayValue: '1976'},
                        {value: '1975', displayValue: '1975'},
                        {value: '1974', displayValue: '1974'},
                        {value: '1973', displayValue: '1973'},
                        {value: '1972', displayValue: '1972'},
                        {value: '1971', displayValue: '1971'},
                        {value: '1970', displayValue: '1970'},
                        {value: '1969', displayValue: '1969'},
                        {value: '1968', displayValue: '1968'},
                        {value: '1967', displayValue: '1967'},
                        {value: '1966', displayValue: '1966'},
                        {value: '1965', displayValue: '1965'},
                        {value: '1964', displayValue: '1964'},
                        {value: '1963', displayValue: '1963'},
                        {value: '1962', displayValue: '1962'},
                        {value: '1961', displayValue: '1961'},
                        {value: '1960', displayValue: '1960'},
                        {value: '1959', displayValue: '1959'},
                        {value: '1958', displayValue: '1958'},
                        {value: '1957', displayValue: '1957'},
                        {value: '1956', displayValue: '1956'},
                        {value: '1955', displayValue: '1955'},
                        {value: '1954', displayValue: '1954'},
                        {value: '1953', displayValue: '1953'},
                        {value: '1952', displayValue: '1952'},
                        {value: '1951', displayValue: '1951'},
                        {value: '1950', displayValue: '1950'},
                        {value: '1949', displayValue: '1949'},
                        {value: '1948', displayValue: '1948'},
                        {value: '1947', displayValue: '1947'},
                        {value: '1946', displayValue: '1946'},
                        {value: '1945', displayValue: '1945'},
                        {value: '1944', displayValue: '1944'},
                        {value: '1943', displayValue: '1943'},
                        {value: '1942', displayValue: '1942'},
                        {value: '1941', displayValue: '1941'},
                        {value: '1940', displayValue: '1940'}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();

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
            alert("Thanks For the review");
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
        
        return (
            

            <div className="zevioo-write-review-wrapper">
                <div className="zevioo-write-review-box">
                <form id="zevioo-review-form" onSubmit={this.orderHandler}>
                    <div className="zevioo-write-review-header">
                        <label className="zevioo-label">
                            Αξιολογήστε το
                        </label>
                        <label className="zevioo-label-medium">
                            Αν η κριτική σας είναι ενδιαφέρουσα, ενδέχεται να δημοσιοποιηθεί (χωρίς τα προσωπικά σας δεδομένα φυσικά)
                            και σε άλλες ιστοσελίδες που συνεργάζονται με το zevioo.
                        </label>
                        <div className="zevioo-rating-group">
                            <label className="zevioo-label-small zevioo-rating-title">
                                Συνολική βαθμολογία 
                            </label>
                            <Input 
                                elementType={this.state.reviewForm.rating.elementType}
                                elementConfig={this.state.reviewForm.rating.elementConfig}
                                value={this.state.reviewForm.rating.value}
                                changed={(event) => this.inputChangedHandler(event, 'rating')}
                               
                                 />
                        </div>
                    </div>

                    <div className="zevioo-write-review-body">
                        <div className="zevioo-form">
                            <div className="zevioo-form-group zevioo-flex">
                            <div className="zevioo-half">
                                <Input 
                                    elementType={this.state.reviewForm.positiveReview.elementType}
                                    elementConfig={this.state.reviewForm.positiveReview.elementConfig}
                                    value={this.state.reviewForm.positiveReview.value}
                                    changed={(event) => this.inputChangedHandler(event, 'positiveReview')} />
                                <span className="zevioo-form-span">max. 300 χαρακτήρες</span>
                                </div>
                                <div className="zevioo-half">
                                    <Input 
                                        elementType={this.state.reviewForm.negativeReview.elementType}
                                        elementConfig={this.state.reviewForm.negativeReview.elementConfig}
                                        value={this.state.reviewForm.negativeReview.value}
                                        changed={(event) => this.inputChangedHandler(event, 'negativeReview')} />
                                    <span className="zevioo-form-span">max. 300 χαρακτήρες</span>
                                </div>
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
                            <div className="zevioo-form-group">
                            <Input 
                            elementType={this.state.reviewForm.titleReview.elementType}
                            elementConfig={this.state.reviewForm.titleReview.elementConfig}
                            value={this.state.reviewForm.titleReview.value}
                            changed={(event) => this.inputChangedHandler(event, 'titleReview')} />
                                <span className="zevioo-form-span">max. "150" χαρακτήρες</span>
                            </div>
                        </div>
                    </div>

                    <div className="zevioo-write-review-footer">
                        <div className="zevioo-user-info zevioo-form">
                            <div className="zevioo-form-group">
                                <Input 
                                elementType={this.state.reviewForm.firstName.elementType}
                                elementConfig={this.state.reviewForm.firstName.elementConfig}
                                value={this.state.reviewForm.firstName.value}
                                changed={(event) => this.inputChangedHandler(event, 'firstName')} />
                            </div>
                            <div className="zevioo-form-group">
                                <Input 
                                elementType={this.state.reviewForm.lastName.elementType}
                                elementConfig={this.state.reviewForm.lastName.elementConfig}
                                value={this.state.reviewForm.lastName.value}
                                changed={(event) => this.inputChangedHandler(event, 'lastName')} />
                            </div>
                            <div className="zevioo-form-group">
                                <Input 
                                elementType={this.state.reviewForm.email.elementType}
                                elementConfig={this.state.reviewForm.email.elementConfig}
                                value={this.state.reviewForm.email.value}
                                changed={(event) => this.inputChangedHandler(event, 'email')} />
                            </div>
                            <div className="zevioo-form-group">
                                <label className="zevioo-label-small">
                                    Date Of Birth:
                                </label>
                                <Input 
                                elementType={this.state.reviewForm.age.elementType}
                                elementConfig={this.state.reviewForm.age.elementConfig}
                                value={this.state.reviewForm.age.value}
                                changed={(event) => this.inputChangedHandler(event, 'age')} />
                            </div>
                            <div className="zevioo-form-group">
                                <label className="zevioo-label-small">
                                    Gender:
                                </label>
                                <Input 
                                elementType={this.state.reviewForm.gender.elementType}
                                elementConfig={this.state.reviewForm.gender.elementConfig}
                                value={this.state.reviewForm.gender.value}
                                changed={(event) => this.inputChangedHandler(event, 'gender')} />
                            </div>
                            <div className="zevioo-form-group__actions">
                                <input type="submit" className="zevioo-button" value="Post" />
                                <button className="zevioo-button" id="cancel-form" onClick={this.props.click}>Cancel</button>
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
