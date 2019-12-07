import { Component } from 'react'

class Emailer extends Component {
  constructor (props) {
    super(props)
    console.log(props);
    this.isDark = props.isDark || false;

    this.state = {
      hasSubmitted: false,
    }
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
      res.status === 200 ? this.setState({ submitted: true }) : ''
    })
  }

  render () {
    let primaryColor = this.isDark ? 'white' : 'black';
    let secondaryColor = this.isDark ? 'black' : 'white';

    return (
      <div id='emailer'>
        <input type='text' placeholder='email address' spellcheck='false'/>
        <div id='emailsubmit'>Submit</div>
        <style jsx>{`
          #emailer {
            width: 250px;
            height: 45px;
            position: relative;
          }
          #emailer input:focus {
            border: 1px solid blue;
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
          }
          #emailsubmit:hover {
            background: brown;
            color: white;
        `}</style>
      </div>
    )
  }
}

export default Emailer
