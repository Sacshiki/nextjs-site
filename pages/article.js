import { withRouter } from "next/router";
const { getGalleries, getArticle, getArticles } = require('../utils/strapi.js')
import Head from 'next/head'
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Banner from '../components/banner.js'
import Gallery from '../components/gallery.js'

import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import stylesheet from 'antd/dist/antd.min.css'

function Article({ article, articles, galleries }) {

  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
      <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      <title>Sacshiki - Your Favorite Pocket</title>
    </Head>
    <Header galleries={galleries} articles={articles} disabledArticleId={article.id}/>

    <div>
      <Banner images={article.media} text={article.title}/>
      {/* {article.galleries && article.galleries.length > 0 ? 
        <div id='slide1'>
          <Gallery gallery={article.galleries[0]} slug={article.galleries[0].slug} captions={true} speed={7000} />
        </div>
        : ''
      }  */}

      <div className="section">
        <div className="textContainer">
          <ReactMarkdown source={article.content} />
        </div>
      </div>
    </div>

    <Footer/>

    <style jsx global>{`
      body {
        font-family: 'Open Sans', sans-serif;
        // font-family: 'Montserrat', sans-serif;
        margin: 0px;
        color: #171717;
        overflow-x: hidden;
      }
      .textContainer {
        padding: 40px 90px 40px 90px;
      }

      @media only screen and (max-width: 650px) {
        .textContainer {
          padding: 20px;
        }
      }
      .mb-20 {
        margin-bottom:20px
      }
      #card2 {
        width: 100%;
        background: rgba(243, 215, 198, 0.6);
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
        margin-right: -50px;
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
      }
    `}</style>
  </>;
}

Article.getInitialProps = async (router) => {
  const article = await getArticle(router.query.slug);
  const articles = await getArticles();
  const galleries = await getGalleries();
  return { article, articles, galleries };
};

export default withRouter(Article);
