import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Loading from '../../../components/Loading/Loading';
import Close from '../../../components/Svg/close.svg';

class AskQuestion extends Component {
    state = {
        questionForm: {
            question: {
                
                elementType: 'textarea',
                elementConfig: {
                    id: 'zevioo-title-review',
                    className: 'zevioo-form-input',
                    name: 'question',
                    required: true,
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
                    required: true,
                    name: 'user_firstname',
                    placeholder: 'Γιάννης'
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
                    required: true,
                    className: 'zevioo-form-input user-name',
                    name: 'user_lastname',
                    placeholder: 'Μ'
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
                    placeholder: 'giannis@mail.com'
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
                    id: 'user_year',
                    placeholder: '20'
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
    askHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );

        const formData = {};
        for (let formElementIdentifier in this.state.questionForm) {
            formData[formElementIdentifier] = this.state.questionForm[formElementIdentifier].value;
        }
        const render = document.getElementById('zevioo-reviews');
        const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
        const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
        const EAN = render.getAttribute('data-ean');
        console.log(USR, PSW, EAN)
        const questionForm = this.state.questionForm;
        
        const newReview = JSON.stringify({
            USR: USR,
            PSW: PSW,
            EML: questionForm.email.value,
            FN: questionForm.firstName.value,
            LN: questionForm.lastName.value,
            AG: questionForm.age.value,
            EAN: EAN,
            QT: questionForm.question.value,
            SZ:true,
            TM:false

        })
        console.log(newReview)
        axios.post( '/postquestion', newReview )
        .then( response => {
            console.log(response)
            this.setState( { loading: false, showSuccess: true } );

            alert("Thanks For the Question");
            this.setState(this.state);

        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
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
        const updatedquestionForm = {
            ...this.state.questionForm
        };
        const updatedFormElement = { 
            ...updatedquestionForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedquestionForm[inputIdentifier] = updatedFormElement;
        
        

        let formIsValid = true;
        for (let inputIdentifier in updatedquestionForm) {
            formIsValid = updatedquestionForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({questionForm: updatedquestionForm, formIsValid: formIsValid});
    }

    render() {
        if (this.state.loading) {
           return <Loading />
        }
        if (this.state.showSuccess) {
            return (
                <div className="zevioo-form__success">
                    <div className="zevioo-close-icons" onClick={this.props.click}><img src='https://zevioo.com/widgets/media/close.svg'  className="zevioo-close-svg" alt="zevioo Close"/></div>
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
                <form id="zevioo-question-form" onSubmit={this.askHandler}>
                  

                    <div className="zevioo-write-review-body">
                        <div className="zevioo-form">
                            <div className="zevioo-form-group">
                            <label className="zevioo-label-big">
                            What is your question?
                            </label>
                            <Input 
                            elementType={this.state.questionForm.question.elementType}
                            elementConfig={this.state.questionForm.question.elementConfig}
                            value={this.state.questionForm.question.value}
                            changed={(event) => this.inputChangedHandler(event, 'question')} />
                                <span className="zevioo-form-span">max. "150" χαρακτήρες</span>
                            </div>
                        </div>
                    </div>

                    <div className="zevioo-write-review-footer">
                        <div className="zevioo-user-info zevioo-form">
                            <div className="zevioo-form-group">
                                <div className="zevioo-form-group__inline">
                                    <label className="zevioo-label-big">
                                    Όνομα & αρχικό επιθέτου
                                    </label>
                                    <Input 
                                    elementType={this.state.questionForm.firstName.elementType}
                                    elementConfig={this.state.questionForm.firstName.elementConfig}
                                    value={this.state.questionForm.firstName.value}
                                    changed={(event) => this.inputChangedHandler(event, 'firstName')} />
                                </div>
                                <div className="zevioo-form-group__inline">
                                    <Input 
                                    elementType={this.state.questionForm.lastName.elementType}
                                    elementConfig={this.state.questionForm.lastName.elementConfig}
                                    value={this.state.questionForm.lastName.value}
                                    changed={(event) => this.inputChangedHandler(event, 'lastName')} />
                                </div>
                                <div className="zevioo-form-group__inline">
                                    <label className="zevioo-label-big">
                                        Age
                                    </label>
                                    <Input 
                                    elementType={this.state.questionForm.age.elementType}
                                    elementConfig={this.state.questionForm.age.elementConfig}
                                    value={this.state.questionForm.age.value}
                                    changed={(event) => this.inputChangedHandler(event, 'age')} />
                                </div>
                            </div>
                            <div className="zevioo-form-group">
                                <Input 
                                elementType={this.state.questionForm.email.elementType}
                                elementConfig={this.state.questionForm.email.elementConfig}
                                value={this.state.questionForm.email.value}
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

export default AskQuestion;
