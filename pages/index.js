import React from 'react'
import Header from '../components/header.js'
import { Component } from 'react'

class Card1 extends Component {
  render () {
    return (
      <div id='card1' className='card'>
        <img id='model1' src="/static/images/model_1_TEMP.jpg" alt="model1" />

        <style jsx>{`
          #card1 {
            width: 100%
          }
          img {
            width: 100%;
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

    <style jsx global>{`
      body {
        margin: 0px;
        background: #000;
        font: 11px monospace;
        color: #fff;
      }
    `}</style>
  </div>
)
