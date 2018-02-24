import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const render = document.getElementById('zevioo-reviews');
const USR = document.getElementById('zevioo-reviews').getAttribute('data-usr');
const PSW = document.getElementById('zevioo-reviews').getAttribute('data-psw');
const EAN = render.getAttribute('data-ean');


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
        <div className="zevioo-thumb__success">
        <div className="zevioo-success-title">Ευχαριστούμε!</div>
        <div className="zevioo-success-subTitle">
            Η προτίμηση σας έχει καταχωρηθεί.
        </div>
        </div>)

    render() {
       const showThumbForm = (
            (this.state.showSuccess) ? this.showSuccessHtml :
            <form className="zevioo-form__thumb" onSubmit={(e) => this.emailHandleSubmit(e , this.state.postData)}>
            <div className="zevioo-user-info zevioo-form">
                <div className="zevioo-form-group">
                    <div className="zevioo-thumb-title">Παρακαλώ εισάγετε το e-mail σας για να καταχωρηθεί η προτίμησή σας</div>
                    <input className='zevioo-form-input' type="email" value={this.state.emailValue} onChange={(e) => this.emailHandleChange(e)}  required />
                </div>
                <div className="zevioo-form-group zevioo-flex__right">
                    <input className="zevioo-button zevioo-color__btn" type="submit" value="Υποβολή" />
                </div>
            </div>
        </form>
        )
        return (
            <Aux>
            <Backdrop show={this.state.showModal} clicked={(e) => this.modalCancelHandler(e)} />
            <div className="zevioo-helpful">
                <div className={(this.state.showModal) ? "zevioo-helpful_on" : "" }>
                {(this.state.showModal) ? showThumbForm : null}
                </div>
            <span className="zevioo-helpful-title">Σας φάνηκε χρήσιμη;</span>
            <span className="zevioo-thumb-up" onClick={(e) => this.thumbHandler(e, '1')}>
                <img src='https://zevioo.com/widgets/media/thumbUp.svg' className="zevioo-thumb" alt="zevioo Thumb up" height="20px"/> {this.state.likeCounter}
            </span>
            <span className="zevioo-thumb-down" onClick={(e) => this.thumbHandler(e, '-1')}>
                <img src='https://zevioo.com/widgets/media/thumbDown.svg'  className="zevioo-thumb" alt="zevioo Thumb Down" height="20px"/> {this.state.dislikeCounter}
            </span>    
            </div>
            </Aux>
        )
    }


}

export default ThumbsForm;