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
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
            padding-bottom: 20px;
          }
          #logo {
            width: 125.7px;
            height: 56.01px;
            z-index: 101;
          }
          #ig {
            width: 33px;
            height: 33px;
            z-index: 101;
          }
          #cc {
            font-size: 10px;
            width: 100%;
            text-align: center;
            color: white;
            position: absolute;
            bottom: 4px;
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
