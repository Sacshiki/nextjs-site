import { Component } from 'react'
import { notification } from 'antd'

class Emailer extends Component {
  constructor (props) {
    super(props)
    this.isDark = props.isDark || false;

    this.state = {
      email: "",
      hasSubmitted: false,
      isSubmitting: false,
    }

    notification.config({
      placement: 'topRight',
      top: 40,
      duration: 2,
    });
  }

  submitForm (data) {
    fetch('/api/contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ hasSubmitted: true });
        return true;
      } else {
        return false;
      }
    })
  }

  validateEmail (email) {
    let emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRe.test(email);
  }

  clickSubmit (e) {
    let success = false;
    this.setState({isSubmitting: true});
    let email = this.state.email;

    if (this.validateEmail(email)) {
      if (this.submitForm({email})) {
        success = true;
        notification.success({
          message: "Sign-Up Success!",
          description: `Thank you for signing up for Sacshiki. We'll be in touch.`,
        });
      } else {
        notification.error({
          message: "Email Not Sent",
          description: `Something went wrong. Please try again`,
        });
      }
    } else {
      notification.warning({
        message: "Invalid Email",
        description: `'${email}' is not a valid email. Please try again`,
      });
    }
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
            <input type='text' value={this.state.email} placeholder='email address' spellCheck='false' onChange={e=>this.setState({email: e.target.value})}/>
            <div id='emailsubmit' onClick={e => {this.clickSubmit(e)}}>{this.state.isSubmitting ? "..." : "Submit" }</div>
          </div>
        )}
        <style jsx>{`
          #submitted {
            width: 250px;
            height: 45px;
            position: relative;
            background: ${primaryColor};
            color: ${primaryColor};
          }
          #emailer {
            width: 250px;
            height: 45px;
            position: relative;
          }
          #emailer input:focus {
            border: 1px solid ${hoverColor};
          }
          input {
            height: 100%;
            width: 100%;
            border-width: 0;
            background: none;
            padding-left: 7px;
            outline: none;
            border: 1px solid ${primaryColor};
          }
          #emailsubmit {
            position: absolute;
            height: 29px;
            width: 62px;
            top: 7px;
            right: 7px;
            background: ${primaryColor};
            color: ${secondaryColor};
            text-align: center;
            vertical-align: middle;
            line-height: 29px;
            cursor: pointer;
            user-select: none;
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
