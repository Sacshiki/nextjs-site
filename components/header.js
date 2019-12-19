import { Component } from 'react'
import { IgIcon, SacshikiLogo } from './logo.js'
const { getGallery } = require('../utils/strapi.js')
import Emailer from './emailer.js'
import {
  Row,
  Col,
  Modal,
} from 'antd'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      imageUrl: "/static/images/2a2a2a.png",
    }

    const gallery = getGallery("hp-modal", props.galleries)
    if (gallery.slides.length > 0) {
      this.state = {
        imageUrl: gallery.slides[0].link,
      }
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
        <div id='row'>
          <img id='modalimg' src={this.state.imageUrl} alt="modalimg" />
          <div id='modalcontent'>
            <h1>Drop us a line</h1>
            <h3>Interested in sewing? Volunteering at a forage garden? Press Inquiry? Or just have a question? Here you go:</h3>
            <Emailer showContentInput={true}/>
            <p onClick={()=>this.setState({showModal: false})}>Nope, changed my mind!</p>
          </div>
        </div>
        <style jsx>{`
          #row {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          #modalcontent {
            padding: 20px;
            width: 50%;
          }
          #modalimg {
            width: 410px;
            max-width: 50%;
            height: 410px;
            max-height: 100%;
            object-fit: cover;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border-top-right-radius: 0px;
            display: inline;
          }
          p {
            margin-top: 7px;
          }
          p:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          @media only screen and (max-width: 650px) {
            #row {
              flex-direction: column;
            }
            #modalcontent {
              padding: 20px;
              width: 100%;
              height: 50%
            }
            #modalimg {
              display: none;
            }
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
            padding: 10px 90px 0px 90px;
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
            margin-top: 25px;
          }
          .link:hover {
            color: #F3D7C6;
          }

          @media only screen and (max-width: 650px) {
            #header {
              padding: 10px 20px 0px 20px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Header
