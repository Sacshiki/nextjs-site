import React from 'react'
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Emailer from '../components/emailer.js'
import Gallery from '../components/gallery.js'
import { Component } from 'react'
const { getImages, strapiUrl } = require('../utils/strapi.js')

import {
  Row,
  Col,
  Layout,
  Carousel,
  Button,
} from 'antd';
import stylesheet from 'antd/dist/antd.min.css'

class Card1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: "/static/images/back_1.jpg",
    }
    getImages("hp-hero").then((slides) => {
      if (slides.length > 0) {
        this.setState({
          imageUrl: `${strapiUrl}${slides[0].Image.url}`,
        });
      }
    });
  }

  // TODO fonts, text spacing
  render () {
    return (
      <div id='card1' className='card'>
        <img id='model1' src={this.state.imageUrl} alt="model1" />
        <div id='maintext'>
          <div className='title'>Your Most Useful Pocket</div>
          <div className='subtitle'>An accessory you didn&#8217;t know you needed</div>
          <div className='subtitle'>but will change your life and community</div>
        </div>


        <style jsx>{`
          #card1 {
            height: 100vh;
            width: 100vw;
          }
          #model1 {
            height: 100%;
            width: 100%;
            overflow: hidden;
            object-fit: cover;
            object-position: 0 26%;
          }
          #maintext {
            position: absolute;
            width: 100%;
            height: 100vh;
            top: 0;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: #FDF8F1;
          }
          .title {
            font-family: sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 40px;
            line-height: 68px;
          }
          .subtitle {
            font-family: sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 30px;
          }
        `}</style>
      </div>
    )
  }
}

class Card2 extends Component {
  render () {
    return (
      <div id='card2'>
        <Row>
          <Col span={12}>
            <div id='slide1'>
              <Gallery slug='hp-test' height='50vw' width='50vw'/>
            </div>
          </Col>
          <Col span={12}>
            <div id='card2content'>
              <h1>Functional Fashion</h1>
              <h3>Sacshiki began as a tool for urban foraging evolved from furoshiki, a japanese cloth folding art form.</h3>
              <h3>Sign up to learn about this incredibly useful, functional piece of fashion and join us at our next pop-up.</h3>
              <Emailer dark={false}/>
            </div>
          </Col>
        </Row>
        <style jsx>{`
          #card2 {
            height: 50vw;
            width: 100vw;
            background: rgba(243, 215, 198, 0.6);
          }
          #slide1 {
            height: 40vw;
            width: 40vw;
          }
          #card2content {
            color: black;
          }
        `}</style>
      </div>
    )
  }
}

class Card3 extends Component {
  render () {
    return (
      <div id='card3'>
        <Row>
          <Col span={12}>
            <div id='card3content'>
              <h1>Reconnect with nature</h1>
              <h3>There&#8217;s no better way to connect with nature than directly participating in it. Building foraging locations in urban areas; learning how to plant, care for, and harvest wild edibles. This is what drives Sacshiki forward.</h3>
              <h3>Proceeds from Sacshiki sales go directly towards our foraging initiatives.</h3>
            </div>
          </Col>
          <Col span={12}>
            <div id='slide2'>
              <Gallery slug='hp-test' height='50vw' width='50vw'/>
            </div>
          </Col>
        </Row>
        <style jsx>{`
          #card3 {
            height: 50vw;
            width: 100vw;
            background: white;
          }
          #slide2 {
            height: 50vw;
            width: 50vw;
          }
          #card2content {
            color: black;
          }
        `}</style>
      </div>
    )
  }
}

export default () => (
  <div>
    <Header/>
    <Card1/>
    <Card2/>
    <Card3/>
    <Footer/>

    <style jsx global>{`
      body {
        margin: 0px;
        font: 11px monospace;
        color: #fff;
      }
    `}</style>
  </div>
)

