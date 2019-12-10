import { Component } from 'react'
import { IgIcon, SacshikiLogo } from './logo.js'
import Emailer from './emailer.js'
import {
  Row,
  Col,
  Modal,
} from 'antd'

class Header extends Component {
  // TODO hover state IG
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  renderModal () {
    return (
      <Modal
        visible={this.state.showModal}
        onCancel={() => {this.state.showModal ? this.setState({showModal: false}) : null}}
        style={{ top: '20' }}
        bodyStyle={{ padding: '0' }}
        footer={null}
        width={820}
      >
        <Row>
          <Col span={12}>
            <img id='model1' src="/static/images/back_1.jpg" alt="model1" />
          </Col>
          <Col span={12}>
            <h1>Connect With Us</h1>
            <h3>Subscribe for our monthly updates and find out how</h3>
            <Emailer/>
            <p onClick={()=>this.setState({showModal: false})}>Maybe later, thank you</p>
          </Col>
        </Row>
        <style jsx>{`
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        `}</style>
      </Modal>
    );
  }

  render () {
    return (
      <div id='header'>
        <Row>
          <Col span={12}>
            <div id='logo'>
              <SacshikiLogo/>
            </div>
          </Col>
          <Col span={12}>
            <div id='links'>
              <div id='contact' className='link' onClick={()=>this.setState({showModal: true})}>
                Contact
              </div>
              <div id='iglogo'>
                <IgIcon />
              </div>
            </div>
          </Col>
        </Row>
        {this.renderModal()}

        <style jsx>{`
          #header {
            position: absolute;
            width: 100%;
            z-index: 50;
            padding: 10px 20px 0px 20px;
          }
          #logo {
            width: 125.7px;
            height: 56.01px;
          }
          #links {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding-right: 10px;
            color: white;
          }
          #ig {
            width: 33px;
            height: 33px;
          }
          .link {
            font-size: 15px;
            cursor: pointer;
          }
          #contact {
            margin-top: 22px;
            margin-right: 15px;
          }
          #iglogo {
            margin-top: 17px;
          }
          .link:hover {
            color: #F3D7C6;
          }
        `}</style>
      </div>
    )
  }
}

export default Header
