import { Component } from 'react'
import { Carousel } from 'antd';
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
    this.width = this.props.width || '100%';
    this.height = this.props.height || '100%';

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
          <img className='slide' src={`${strapiUrl}${slide.Image.url}`}/>
          <style jsx>{`
            .slidecontainer {
              height: ${this.height};
              width: ${this.width};
            }
            .slide {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
        `}</style>
        </div>
      );
    });
    console.log(images);
    return (
      <div className='carouselcontainer'>
        <div id='left' className='switcher' onClick={this.prev}>{'<<<<<<'}</div>
        <div id='right' className='switcher' onClick={this.next}>{'>>>>>>'}</div>
        <Carousel ref={node => (this.carousel = node)} dots={false} className='carousel'>
          { images }
        </Carousel>
        <style jsx>{`
          .carouselcontainer {
            position: relative;
            height: 100%;
            width: 100%;
          }
          .carousel {
            height: 100%;
            width: 100%;
          }
          .switcher {
            position: absolute;
            z-index: 50;
          }
          #left {
            left: 5px;
            top: 50%;
          }
          #right {
            right: 5px;
            top: 50%;
          }
        `}</style>
      </div>
    );
  }
}

export default Gallery
