import { withRouter, useRouter } from "next/router";
import {  Row, Col, Image  } from "antd";
import styles from './how-to-sacshiki.css'
const { getGalleries, getGallery, getArticle, getArticles } = require('../../utils/strapi.js')

import Head from 'next/head'
import Header from '../../components/header.js'
import Footer from '../../components/footer.js'
import Banner from '../../components/banner.js'
// import Gallery from '../../components/gallery.js'

// import ReactMarkdown from "react-markdown";
import ReactHtmlParser from 'react-html-parser'; 

import stylesheet from 'antd/dist/antd.min.css'

function flatten(text, child) {
    return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
  }
const StepShow = ({ step, idx }) => {
      const stepNum = idx+1

      const textCol = <div className="text-col">
        <article>
          <h3><span>0{stepNum}</span></h3>
          <h4>{step.Title}</h4>
          <p>{step.Description}</p>
        </article>
      </div>

      const imgCol = <div className="img-col">
          <Image width={500} className="slide"
          src={step.link}
          />
      </div>
      const leftCol = (stepNum%2==0) ? textCol : imgCol
      const rightCol = (stepNum%2==0) ? imgCol : textCol
      const classRow = (stepNum%2==0) ? "even-step" : "odd-step"
      return <>
      <Row gutter={[36,36]} className={classRow}>
        <Col md={2} sm={0}></Col>
        <Col md={10} sm={12}>
            {leftCol}
        </Col>
        <Col md={10} sm={12}>
            {rightCol}
        </Col>
        <Col md={2} sm={0}></Col>

      </Row>
      </>
  }
const Article= ({ articles, galleries }) => {

  const router = useRouter();
  const slug = 'making-a-sacshiki'
  const gallery = getGallery(slug, galleries)
  const steps = gallery.slides
  const media = [{link:"https://storage.googleapis.com/cdn.sacshiki.com/knowledge-files/making-header.jpg"}]

  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
      <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
      <script async charSet="utf-8" src="//cdn.iframe.ly/embed.js" ></script>
      <title>Sacshiki - Your Favorite Pocket</title>
    </Head>
    <Header galleries={galleries} articles={articles} disabledArticleSlug={slug}/>
    <div>
      <Banner images={media} text="The Making of a Sacshiki" />
      
    <section id="section" className="test">

            { steps && steps.map((slide,idx)=>(
                <>
                <StepShow step={slide} idx={idx} />
                </>
            ))}

    </section>
    </div>


    <Footer/>
  </>;
}

Article.getInitialProps = async (router) => {
  const articles = await getArticles();
  const galleries = await getGalleries();
  return { articles, galleries };
};

export default withRouter(Article);
