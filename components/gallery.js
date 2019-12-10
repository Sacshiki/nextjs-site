import { Component } from 'react'
import { Carousel, Icon } from 'antd';
const { getImages, strapiUrl } = require('../utils/strapi.js')

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: [],
    }
    this.slug = props.slug || "hp-default";

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.carousel = React.createRef();

    getImages(this.slug).then((slides) => {
      this.setState({slides});
    });
  }
  next() {
    this.carousel.next();
  }
  prev() {
    this.carousel.prev();
  }

  render () {
    const images = this.state.slides.map((slide) => {
      return (
        <div className='slidecontainer'>
          <img className='slide' src={slide.Image.url}/>
          <style jsx>{`
            .slidecontainer {
              height: 100%;
              width: 100%;
              // position: relative;
            }
            .slide {
              width: 100%;
              height: auto;
              object-fit: fill;
              // position: absolute;
            }
        `}</style>
        </div>
      );
    });

    return (
      <div className='carouselcontainer'>
        <div id='left' className='switcher' onClick={this.prev}>
          <Icon type="left"/>
        </div>
        <div id='right' className='switcher' onClick={this.next}>
          <Icon type="right"/>
        </div>
        <Carousel ref={node => (this.carousel = node)} dots={false} className='carousel'>
          { images }
        </Carousel>
        <style jsx>{`
          .carouselcontainer {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          .carousel {
            height: 100%;
            width: 100%;
          }
          .switcher {
            position: absolute;
            z-index: 50;
            font-size: 20px;
            top: 45%;
          }
          .switcher:hover {
            color: #2A2A2A;
            font-size: 21px;
          }
          #left {
            left: 5px;
          }
          #right {
            right: 5px;
          }
        `}</style>
      </div>
    );
  }
}

export default Gallery
