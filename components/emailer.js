import { Component } from 'react'
import { notification } from 'antd'

class Emailer extends Component {
  constructor (props) {
    super(props)
    this.isDark = props.isDark || false;
    this.showContentInput = props.showContentInput || false;

    this.state = {
      email: "",
      content: null,
      hasSubmitted: false,
      isSubmitting: false,
    }

    notification.config({
      placement: 'topRight',
      top: 40,
      duration: 2,
    });
  }

  submitForm (data) { // returns a Promise
    return fetch('/api/contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  validateEmail (email) {
    let emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRe.test(email);
  }

  clickSubmit (e) {
    let success = false; // if this becomes true, the input changes to a thank you msg
    this.setState({isSubmitting: true});
    let email = this.state.email;
    let text = this.state.content;

    if (this.validateEmail(email)) {
      this.submitForm({email, text}).then((res) => {
        if (res.status === 200) {
          success = true;
          this.setState({ hasSubmitted: true });
          notification.success({
            message: "Sign-Up Success!",
            description: `Thank you for signing up for Sacshiki. We'll be in touch.`,
          });
        } else {
          notification.error({
            message: "Email Not Sent",
            description: `Something went wrong. Please try again`,
          });
        }//if status=200
      })//submitform
    } else {
      notification.warning({
        message: "Invalid Email",
        description: `'${email}' is not a valid email. Please try again`,
      });
    }//if validemail

    this.setState({isSubmitting: false, hasSubmitted: success});
  }

  render () {
    let primaryColor = this.isDark ? 'white' : 'black';
    let secondaryColor = this.isDark ? 'black' : 'white';
    let hoverColor = this.isDark ? '#F3D7C6' : '#77453E';

    return (
      <div>
        { this.state.hasSubmitted ?  (
          <div id='submitted'>
            Thank You!
          </div>
        ) : (
          <div id='emailer'>
            { this.showContentInput ?
              <textarea id='contentinput' type='text' value={this.state.content} placeholder='your message' spellCheck='false' onChange={e=>this.setState({content: e.target.value})}/> :
              null
            }
            <input type='text' value={this.state.email} placeholder='email address' spellCheck='false' onChange={e=>this.setState({email: e.target.value})}/>
            <div id='emailsubmit' onClick={e => {this.clickSubmit(e)}}>{this.state.isSubmitting ? "..." : "Submit" }</div>
          </div>
        )}
        <style jsx>{`
          #submitted {
            width: 280px;
            height: 45px;
            position: relative;
            color: ${primaryColor};
            text-align: center;
            line-height: 45px;
            border: 1px solid ${primaryColor};
          }
          #emailer {
            width: 280px;
            height: 100%;
            position: relative;
          }
          #emailer input:focus {
            border: 1px solid ${hoverColor};
          }
          input, textarea {
            height: 45px;
            width: 100%;
            border-width: 0;
            background: none;
            padding-left: 7px;
            outline: none;
            border: 1px solid ${primaryColor};
            position: relative;
          }
          #contentinput {
            height: 100px;
            margin-bottom: 7px;
          }
          #emailsubmit {
            position: absolute;
            height: 29px;
            width: 62px;
            bottom: 7px;
            right: 7px;
            background: ${primaryColor};
            color: ${secondaryColor};
            text-align: center;
            vertical-align: middle;
            line-height: 29px;
            cursor: pointer;
            user-select: none;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
          }
          #emailsubmit:hover {
            background: ${hoverColor};
            color: ${secondaryColor};
        `}</style>
      </div>
    )
  }
}

export default Emailer
