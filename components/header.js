import { Component } from 'react'
import { IgIcon, SacshikiLogo } from './logo.js'

class Header extends Component {
  // TODO make IG clickable
  // TODO hover state IG
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div id='header'>
        <div id='logo'>
          <SacshikiLogo/>
        </div>
        <div id='ig'>
          <IgIcon />
        </div>

        <style jsx>{`
          #header {
            position: absolute;
            width: 100%;
          }
          #logo {
            position: absolute;
            width: 125.7px;
            height: 56.01px;
            left: 10vw;
            top: 5vw;
          }
          #ig {
            position: absolute;
            width: 33px;
            height: 33px;
            right: 10vw;
            top: 5vw;
          }
        `}</style>
      </div>
    )
  }
}

export default Header
