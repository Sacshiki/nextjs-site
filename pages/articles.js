import { Component } from 'react'
import Head from 'next/head'
import Header from '../components/header.js'
import Footer from '../components/footer.js'
import Banner from '../components/banner.js'
import { LargeTopo } from '../components/topography.js'
import Link from "next/link";
const { getGalleries, getGallery, getArticles } = require('../utils/strapi.js')
import 'isomorphic-fetch'
import stylesheet from 'antd/dist/antd.min.css'

const Card = ({ article }) => {
  let imageUrl = article.media[0] ? article.media[0].url : null;
  return (
    <div id='card'>
      <Link href={{ pathname: "article", query: { id: article.slug } }}>
        <a>
          <div className="card">
            <div className="cardImg">
              <img src={imageUrl} />
            </div>
            <div className="cardBody">
              <div id="title">
                {article.title}
              </div>
            </div>
          </div>
        </a>
      </Link>

      <style jsx global>{`
        .cardImg {
          height: 150px;
          width: 225px;
        }
        #card {
          border: 1px solid red;
        }
        img {
          height: 100%;
          width: 100%;
          overflow: hidden;
          object-fit: cover;
          object-position: center center;
        }
      `}</style>
    </div>
  );
};

function Articles({ articles, galleries, images }) {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
      <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      <title>Sacshiki - Your Favorite Pocket</title>
    </Head>
    <Header galleries={galleries}/>
    <Banner images={images} text={'ARTICLES'}/>

    <div id='articleList'>
      {articles.map((article, i) => {
        return <Card article={article} key={`article__${article.slug}`} />;
      })}
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
      #articleList {
        padding: 10px 90px 10px 90px;
        display: flex;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      @media only screen and (max-width: 650px) {
        #articleList {
          padding: 10px 20px 10px 20px;
        }
      }
    `}</style>
  </>;
}

Articles.getInitialProps = async () => {
  const articles = await getArticles();
  const galleries = await getGalleries();

  const slug = "ar-banner"
  let gallery = getGallery(slug, galleries);
  const images = gallery.slides;
  return { articles, galleries, images };
};

export default Articles;

