import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import ThumbUp from '../../../components/Svg/thumbUp.svg';
import ThumbDown from '../../../components/Svg/thumbDown.svg';
import Modal from '../../../components/UI/Modal/Modal';

const render = document.getElementById('zevioo-reviews');
const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
const EAN = render.getAttribute('data-ean');
console.log(USR, PSW, EAN)

class ThumbsForm extends Component {
    state = {
        likeCounter: this.props.likeCount,
        dislikeCounter: this.props.dislikeCount,
        thumbable: false,
        showModal: false,
        emailValue: '',
        showSuccess: false,
        postData: {             
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            EML: '',
            RID: this.props.reviewId,
            LT: 0
        }
    }

    modalHandler = () => {
        this.setState({showModal: true});
    }
    modalCancelHandler = () => {
        this.setState({showModal: false});
    }
    thumbHandler =(e, val) => {
        e.preventDefault(e);
        this.modalHandler(e);
        this.setState({postData: {
            USR: USR,
            PSW: PSW,
            EAN: EAN,
            EML: '',
            RID: this.props.reviewId,
            LT: val
        }})
    }

    postForm = (data) => {
        const newThumb = JSON.stringify(this.state.postData)
        axios.post('/saveprdlike', newThumb)
        .then( response => {
            console.log(response)
            this.setState({showSuccess: true});
        } )
        .catch( error => {
            this.setState( { loading: false } );
        } );
    }

    emailHandleChange(event) {
        this.setState({
            emailValue: event.target.value,
            postData: {             
                USR: USR,
                PSW: PSW,
                EAN: EAN,
                EML: event.target.value,
                RID: this.props.reviewId,
                LT: this.state.postData.LT
            }
        });
      }
    
      emailHandleSubmit(event, data) {
        this.postForm(data);
        event.preventDefault();
      }
        showSuccessHtml = (
        <div className="zevioo-form__success">
        <div className="zevioo-success-title">Thank you!</div>
        <div className="zevioo-success-subTitle">
            We’ve just sent you an email. Please confirm your email account by
            clicking on the confirmation link and your Question will be published.
        </div>
        </div>)



    render() {
        return (
            <Aux>
            <Modal show={this.state.showModal} modalClosed={(e) => this.modalCancelHandler(e)}> 
                <div> 
                { (this.state.showSuccess) ? this.showSuccessHtml :
                    <form className="zevioo-form__thumb" onSubmit={(e) => this.emailHandleSubmit(e , this.state.postData)}>
                        <div className="zevioo-user-info zevioo-form">
                            <div className="zevioo-form-group">
                                <label className="zevioo-label-small">Please insert your email:</label>
                                <input className='zevioo-form-input' type="email" value={this.state.emailValue} onChange={(e) => this.emailHandleChange(e)}  required />
                            </div>
                            <div className="zevioo-form-group zevioo-flex__right">
                                <input className="zevioo-button zevioo-color__btn" type="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                }
                </div>
            </Modal>
            <div className="zevioo-helpful">
            Was it helpful? 
            <span className="zevioo-thumb-up" onClick={(e) => this.thumbHandler(e, '1')}>
                <img src='https://zevioo.com/widgets/media/thumbUp.svg' className="zevioo-thumb" alt="zevioo Thumb up"/> {this.state.likeCounter}
            </span>
            <span className="zevioo-thumb-down" onClick={(e) => this.thumbHandler(e, '-1')}>
                <img src='https://zevioo.com/widgets/media/thumbDown.svg'  className="zevioo-thumb" alt="zevioo Thumb Down"/> {this.state.dislikeCounter}
            </span>    
            </div>
            </Aux>
        )
    }


}

export default ThumbsForm;