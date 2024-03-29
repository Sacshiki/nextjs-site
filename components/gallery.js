import { Component } from 'react'
import { Carousel } from 'antd';
import Icon from '@ant-design/icons';
const { getGallery } = require('../utils/strapi.js')

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: []
    }
    this.slug = props.slug || "hp-default";
    this.captions = props.captions || false;
    this.speed = props.speed || 5000
    this.galleries = props.galleries || []
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.carousel = React.createRef();
    let gallery
    if (props.gallery) {
      gallery = props.gallery
    } else {
      gallery = getGallery(this.slug, this.galleries)

    }
    if (!gallery) {return}
    
    if (gallery.slides.length) {
      this.state = {
        slides: gallery.slides
      }
    }
    
  }
  next() {
    this.carousel.next();
  }
  prev() {
    this.carousel.prev();
  }

  render () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplaySpeed: this.speed
    };

    const images = this.state.slides.map((slide) => {
      return (
        <div className='slidecontainer' key={slide.id}>
          <img className='slide' src={slide.link}/>
          { this.captions ? <div className='caption'>{slide.Description}</div> : null }
          <style jsx>{`
            .slidecontainer {
              height: 100%;
              width: 100%;
            }
            .slide {
              width: 100%;
              height: auto;
              object-fit: fill;
            }
            .caption {
              font-size: 12px;
              font-style: italic;
              width: 100%;
              text-align: center;
              bottom: -20px;
              z-index: 50;
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
        <Carousel {...settings} ref={node => (this.carousel = node)} dots={false} autoplay={true} className='carousel'>
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
