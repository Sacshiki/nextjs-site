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
import customstyle from '../static/custom.css'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      imageUrl: "/static/images/2a2a2a.png",
      articles: this.props.articles,
      disabledArticleSlug: this.props.disabledArticleSlug,
      showArticles: false,
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

  renderMenu() {
    return (
      <div id='menu'>
        {this.state.articles.map((article, i) => {
          let className = (article.slug == this.state.disabledArticleSlug) ? "link disabled" : "link";
          return (
            <div className="menuItem">
              <div className={className}>
                <Link href={{ pathname: `/articles/${article.slug}` }}>
                  <div> {article.title} </div>
                </Link>
              </div>
            </div>
          );
        })}

        <style jsx>{`
          #menu {
            border: 1px solid #171717;
            background: white;
            position: absolute;
            right: 0px;
            top: 50px;
            border-radius: 3px;
          }
          .link {
            width: 250px;
            height: 50px;
            padding-left: 8px;
            color: #2a2a2a7a;
            cursor: pointer;
            line-height: 50px;
          }
          .link:hover {
            color: #171717;
            transition: 0.3s;
          }
          .menuItem:not(:first-child) {
            border-top: 1px solid #171717;
          }
          .disabled {
            pointer-events:none;
            color: #171717;
          }
        `}</style>
      </div>
    );
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
      <div id='header' onMouseLeave={()=>this.setState({showArticles: false})}>
        <div id='row'>
          <div id='logo'>
            <SacshikiLogo/>
          </div>
          <div id='links'>
            <div id='contact' className='link' onClick={()=>this.setState({showModal: true})}>
              Contact
            </div>
            <div id='articles'
                 className={"link" + (this.state.showArticles ? " selected" : "")}
                 onMouseEnter={()=>this.setState({showArticles: true})}>
              Articles
            </div>
            <div id='iglogo'>
              <IgIcon />
            </div>
          </div>
        </div>
        {this.renderModal()}
        { this.state.showArticles ?
          this.renderMenu() : null }

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
            padding: 7px;
          }
          .link:hover {
            color: #F3D7C6;
          }
          .selected {
            background: white;
            color: #171717;
            border-radius: 3px;
            z-index: 100;
          }
          .selected:hover {
            color: #171717;
          }
          #articles {
            margin-right: 15px;
          }
          #iglogo {
            height: 22px;
            width: 16px;
            margin-top: 4px;
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
