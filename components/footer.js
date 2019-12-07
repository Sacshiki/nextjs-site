import { Component } from 'react'
import { IgIcon, SacshikiLogo } from './logo.js'

import {
  Row,
  Col,
  Layout,
  Carousel,
  Button,
} from 'antd';

import Emailer from './emailer.js'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div id='footer'>
        <div id='footerrow'>
          <div id='logo'>
            <SacshikiLogo/>
          </div>
          <Emailer isDark={true}/>
          <div id='ig'>
            <IgIcon />
          </div>
        </div>
        <h3 id='cc'>2019 © Sacshiki. All rights reserved</h3>

        <style jsx>{`
          #footer {
            position: relative;
            background: black;
            width: 100%;
            height: 200px;
          }
          #footerrow {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          #logo {
            width: 125.7px;
            height: 56.01px;
          }
          #ig {
            width: 33px;
            height: 33px;
          }
          #cc {
            color: white;
          }
        `}</style>
      </div>
    )
  }
}

export default Footer
