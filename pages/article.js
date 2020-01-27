import { withRouter } from "next/router";
const { getGalleries, getArticle, getArticles } = require('../utils/strapi.js')
import Head from 'next/head'
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Banner from '../components/banner.js'

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
    <Header galleries={galleries} articles={articles} disabledArticleSlug={article.slug}/>

    <div>
      <Banner images={article.media} text={article.title}/>

      <div className="section">
        <div className="textContainer">
          <ReactMarkdown source={article.content} />
          <p>
            <Moment format="MMM Do YYYY">{article.published_at}</Moment>
          </p>
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
    `}</style>
  </>;
}

Article.getInitialProps = async (router) => {
  const articles = await getArticles();
  const article = getArticle(router.query.slug, articles);
  const galleries = await getGalleries();
  return { article, articles, galleries };
};

export default withRouter(Article);
