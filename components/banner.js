import { Component } from 'react'
import { Carousel } from 'antd';

class Banner extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    let {images, text}  = this.props;
    return (
      <div id='banner'>
        <Carousel id='carousel' autoplay>
          {images && images.map((image, i) => {
            return <img className='bannerImg' src={image.url || image.link} key={`image__${image.id}`} />;
          })}
        </Carousel>
        <div id='bannerText'>
          <div id='bannerTitle'> {text} </div>
        </div>

        <style jsx>{`
          #banner {
            height: 20vw;
            width: 100%;
            background: black;
          }
          #carousel {
            height: 250px;
            width: 100%;
          }
          .bannerImg {
            height: 20vw;
            width: 100%;
            overflow: hidden;
            object-fit: cover;
            object-position: center center;
            opacity: 0.65;
          }
          #bannerText {
            position: absolute;
            width: 100%;
            height: 20vw;
            top: 0;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: #FDF8F1;
          }
          #bannerTitle {
            font-family: 'Montserrat', sans-serif;
            font-style: normal;
            font-size: 50px;
            line-height: 68px;
            text-align: center;
            padding-top: 35px;
          }
        `}</style>
      </div>
    )
  }
}

export default Banner
