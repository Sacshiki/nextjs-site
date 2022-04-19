import React from 'react'
import Head from 'next/head';
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Emailer from '../components/emailer.js'
import Gallery from '../components/gallery.js'
import { LargeTopo } from '../components/topography.js'
import { Component } from 'react'
import {  Row, Col, Image  } from "antd";
const { getGalleries, getGallery, getArticles } = require('../utils/strapi.js')

class HomeHero extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: "https://storage.googleapis.com/cdn.sacshiki.com/slide/sacshiki_hero_rough_1_lite-compressor.jpg",
      mobileImageUrl: "https://storage.googleapis.com/cdn.sacshiki.com/slide/sacshiki_hero_rough_1_mobile.jpg",
      slug: "hp-hero"
    }

    let gallery = getGallery(this.state.slug, props.galleries)
    if (gallery.slides.length > 0) {
      // this one doesnt seem to work
      this.state = {
        imageUrl: gallery.slides[0].link,
        mobileImageUrl: gallery.slides[0].mobileLink
      }
    }
  }

  render () {
    return (
      <div id='card1' className='card'>
        <img id='model1' className='splash' src={this.state.imageUrl} alt="model1" />
        <img id='mobilemodel1' className='splash' src={this.state.mobileImageUrl} alt="model1" />
        <div id='maintext'>
          <div className='title'>Your new favorite pocket</div>
          <div className='subtitle'>So useful, comfortable and stylish you'll never regret bringing it out.</div>
        </div>

        <style jsx>{`
          #card1 {
            height: 100vh;
            width: 100vw;
            background: black;
          }
          .splash {
            height: 100%;
            width: 100%;
            overflow: hidden;
            object-fit: cover;
            object-position: center top;
            opacity: 0.65;
          }
          #model1 {
            display: inline;
          }
          #mobilemodel1 {
            display: none;
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
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-size: 50px;
            line-height: 68px;
            text-align: center;
            padding-bottom: 20px;
          }
          .subtitle {
            font-weight: 300;
            font-size: 25px;
            line-height: 30px;
            text-align: center;
          }

          @media only screen and (max-width: 850px) {
            #model1 {
              display: none;
            }
            #mobilemodel1 {
              display: inline;
            }
            #maintext {
              padding: 30px
            }
          }

          @media only screen and (max-width: 650px) {
            .title {
              font-size: 40px;
            }
            .subtitle {
              font-size: 19px;
            }
          }
        `}</style>
      </div>
    )
  }
}

class Functional extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='card2' className="topo-bg">
        <LargeTopo/>
        <Row>
          <Col md={2}></Col>
          <Col md={10}>

          <div className='hp-slides'>
            <Gallery slug='hp-fashion' captions={true} speed={7000} {...this.props}/>
          </div>
          </Col>
          <Col md={10} className="flex">
          
            <div className='cardcontent'>
              <h1>Functional fashion</h1>
              <h3 className="mb-20">Sacshiki began as a tool for the urban forager that evolved from furoshiki, a centuries-old Japanese craft of folding and knotting fabric for parcels, gifts, and anything that needs to be carried. Now the tradition is evolving with Sacshiki, a thoughtfully designed alternative to the single-use plastics that harm our environment.</h3>
              <div id='maincta'>
                <h3><em>Sign up to learn more about this useful and beautiful, soon-to-be indispensable piece of fashion and join us at our next pop-up:</em></h3>
                <Emailer dark={false} isAddContact={true}/>
              </div>
            </div>
          </Col>
        </Row>
        <div id='secondarycta'>
          <h3><em>Sign up to learn more about this useful and beautiful, soon-to-be-indispensable piece of fashion and join us at our next pop-up:</em></h3>
          <Emailer dark={false} isAddContact={true}/>
        </div>

        <style jsx>{`
          .mb-20 {
            margin-bottom:20px
          }
          #card2 {
            width: 100%;
            position: relative;
          }
          #row {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          #slide1 {
            width: 50vw;
            min-width: 50vw;
            height: 50vw;
            padding: 50px;
            margin-left: 40px;
            // margin-right: -50px;
          }
          #card2content h1 {
            font-size: 24px;
            font-family: 'Montserrat', sans-serif;
          }
          #card2content h3 {
            font-size: 14px;
          }
          #card2content {
            color: #171717;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            padding-right: 90px;
            margin-left: -20px;
            margin-bottom: 0px;
          }
          #maincta {
            display: inline;
          }
          #secondarycta {
            display: none;
          }

          @media only screen and (max-width: 750px) {
            #secondarycta {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              padding: 0px 90px 40px 90px;
              font-size: 13px;
              color: #171717;
            }
            #maincta {
              display: none;
            }
          }

          @media only screen and (max-width: 650px) {
            #row {
              display: flex;
              flex-direction: column-reverse;
              justify-content: center;
            }
            #slide1 {
              height: 100vw;
              width: 100vw;
              margin-left: 0px;
              margin-right: 0px;
              padding: 40px;
            }
            #card2content {
              width: 100vw;
              margin-bottom: -35px;
              margin-left: 0px;
              padding-right: 40px;
            }
            #secondarycta {
              display: none;
            }
            #maincta {
              display: inline;
            }
          }
        `}</style>
      </div>
    )
  }
}

class Creator extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='card4'>
        <Row>
          <Col md={2}></Col>
          <Col md={10} className="flex">
            <div className='cardcontent'>
              <h1>The Sacshiki Creator Story</h1>
              <p>First learning the art and utility of furoshiki in 2016, Cameron started utilizing it on a daily basis along with his burgeoning plant foraging practice. He started playing with new ways of keeping a bandana fashioned into a sack on his hip, and was happy to find a use for his new sewing machine.  He began customizing the bandanas, adding reinforcements and grommets and wearing the new innovations daily to beta test his ideas.</p>
              <p>Five years of innovative tinkering later, with much credit to friends and family feedback, the first commercial release was sold at a Holiday market in Oakland in 2021 to a huge success! </p>
              <p>Cameron plays a crucial role in the creation of each sacshiki, doing many of the steps found in the article <a href="/explore/making-a-sacshiki">Making of a Sacshiki.</a></p>
            </div>
          </Col>
          <Col md={10} className="flex">
            <div className='imgwrap'>
              <Image src="https://storage.googleapis.com/cdn.sacshiki.com/assets/founder-seated1024.jpg"></Image>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

class Forage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='card3' className='topo-bg'>
        <LargeTopo/>
        <Row>
          <Col md={2}></Col>
            <Col md={10}>
              <div className='hp-slides'>
                <Gallery slug='hp-foraging' {...this.props}/>
              </div>
            </Col>
            <Col md={10} className="flex">
              <div className='cardcontent'>
                <h1>Sacshiki Garden Collaboration</h1>
                <p className="mb-20">Cameron is also the catalyst and co-founder of the Oakland Urban Farming Project.  With OUFP he is able to devote time to building areas for people to forage throughout the Oakland area. </p>
                <p>Sacshiki support allows him and his growing team to spend more time developing an app to assist in garden building and to spread the love of foraging to any community interested in participating. </p>
              </div>
            </Col>
        </Row>
        <style jsx>{`
          #card3 {
            width: 100%;
            overflow: hidden;
          }

          #row {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          #card3content h1 {
            font-size: 24px;
            font-family: 'Montserrat', sans-serif;
          }
          #card3content h3 {
            font-size: 14px;
          }

          #card3content {
            color: #171717;

            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 15px;
            padding-left: 90px;
          }

          @media only screen and (max-width: 650px) {
            #row {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            #slide2 {
              height: 100vw;
              width: 100vw;
            }
            #card3content {
              width: 100vw;
              padding-left: 40px;
            }
          }


        `}</style>
      </div>
    )
  }
}

function Index({ galleries, articles }) {
  return <>

    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
      <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      <title>Sacshiki - Your Favorite Pocket</title>
    </Head>

    <Header galleries={galleries} articles={articles}/>
    <HomeHero galleries={galleries}/>
    <Functional galleries={galleries}/>
    <Creator />
    <Forage galleries={galleries}/>
    <Footer/>

    <style jsx global>{`
      body {
        font-family: 'Open Sans', sans-serif;
        // font-family: 'Montserrat', sans-serif;
        margin: 0px;
        color: #fff;
        overflow-x: hidden;
      }
    `}</style>
  </>;
}

Index.getInitialProps = async () => {
  const galleries = await getGalleries();
  const articles = await getArticles();
  return { galleries, articles };
};

export default Index;
