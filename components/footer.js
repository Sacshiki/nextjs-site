import { Component } from 'react'
import { LargeTopo } from './topography.js'
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
        <div id='topography'>
          <LargeTopo/>
        </div>
        <div id='footerrow'>
          <div id='logo'>
            <SacshikiLogo/>
          </div>
          <div id='email'>
            <Emailer isDark={true}/>
          </div>
          <div id='ig'>
            <IgIcon />
          </div>
        </div>
        <h3 id='cc'>2019 © Sacshiki. All rights reserved</h3>

        <style jsx>{`
          #footer {
            position: relative;
            background: #171717;
            width: 100%;
            height: 200px;
          }
          #footerrow {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          #email {
            margin-top: 17px;
          }
          #logo {
            margin: 10px;
            width: 125.7px;
            height: 56.01px;
          }
          #ig {
            margin-top: 26px;
            width: 33px;
            height: 33px;
          }
          #cc {
            font-size: 12px;
            width: 100%;
            text-align: center;
            color: white;
            position: absolute;
            bottom: 5px;
          }
          #topography {
            height: 100%;
            width: 100%;
            top: 0;
            position: absolute;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

export default Footer
