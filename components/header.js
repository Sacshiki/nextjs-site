import { Component } from 'react'
import { IgIcon, SacshikiLogo } from './logo.js'
const { getGallery } = require('../utils/strapi.js')
import Emailer from './emailer.js'
import Link from "next/link";
import {
  Dropdown,
  Menu,
  Modal,
  Icon,
} from 'antd'

class Header extends Component {
  constructor (props) {
    super(props)
    // console.log("articles:",this.props.articles)

    this.state = {
      showModal: false,
      imageUrl: "/static/images/2a2a2a.png",
      articles: this.props.articles,
      disabledArticleSlug: this.props.disabledArticleSlug,
    }

    const gallery = getGallery("hp-modal", props.galleries)
    if (gallery.slides.length > 0) {
      this.setState({
        imageUrl: gallery.slides[0].link,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabledArticleSlug !== this.state.disabledArticleSlug) {
      this.setState({ disabledArticleSlug: nextProps.disabledArticleSlug });
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
    const menu = (
      <Menu>
        {this.state.articles.map((article, i) => {
          let className = (article.slug == this.state.disabledArticleSlug) ? "link disabled" : "link";
          return (
            <div>
              <div className={className}>
                <Link href={{ pathname: `articles/${article.slug}` }}>
                  <div> {article.title} </div>
                </Link>
              </div>

              <style jsx>{`
                .link {
                  width: 250px;
                  height: 25px;
                  text-align: center;
                  color: #171717;
                  cursor: pointer;
                }
                .link:hover {
                  background: #2A2A2A;
                  color: white;
                  transition: 0.3s;
                }
                .disabled {
                  background: #2A2A2A;
                  pointer-events:none;
                  color: white;
                }
              `}</style>
            </div>
          );
        })}
      </Menu>
    );

    return (
      <div id='header'>
        <div id='row'>
          <div id='logo'>
            <SacshikiLogo/>
          </div>
          <div id='links'>
            <Dropdown overlay={menu} placement={"bottomLeft"}>
              <div className="link"> Articles </div>
            </Dropdown>
            <div id='contact' className='link' onClick={()=>this.setState({showModal: true})}>
              Contact
            </div>
            <div id='iglogo'>
              <IgIcon />
            </div>
          </div>
        </div>
        {this.renderModal()}

        <style jsx>{`
          #header {
            box-sizing: border-box;
            position: absolute;
            width: 100vw;
            height: 66px;
            z-index: 50;
            padding: 10px 90px 0px 90px;
          }
          #row {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          #logo {
            width: 125.7px;
            height: 56.01px;
          }
          #links {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding-right: 10px;
            color: white;
          }
          .link {
            font-size: 15px;
            cursor: pointer;
            padding-left: 15px;
          }
          #contact {
            // margin-top: 22px;
            margin-right: 15px;
          }
          #iglogo {
            height: 22px;
            width: 16px;
            margin-top: 4px;
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
