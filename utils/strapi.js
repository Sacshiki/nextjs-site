const fetch = require("node-fetch");

// getImages returns an array of JSON slide objects as a promise
// example return:
// [
  // {
    // Title: "Girl Mini Bag",
    // slug: "girl-mini-bag",
    // Description: "Easy access to all your most important things",
    // Image: {
      // name: "IMG_20191013_164602.jpg",
      // url: "/uploads/73a43a844f7b49f687d49986646f6c48.jpg",
    // },
    // id: "5de6a8241a85b10017771e44"
  // }...
// ]
const strapiUrl = "https://knowledge.sacshiki.com/";

const getGalleries = () => {

  let strapiUrl = `https://knowledge.sacshiki.com/galleries`;
  return fetch(strapiUrl)
  .then(response=>response.json())
  .then(galleries=>{
    for (let gallery of galleries) {
        for (let slide of gallery.slides) {
          // cdn path allows for caching with CloudFlare
          slide.link = `https://cdn.sacshiki.com/slide/${slide.Image.name}`
          if (slide.Image_mobile) {
            slide.mobileLink = `https://cdn.sacshiki.com/slide/${slide.Image_mobile.name}`
          }
        }
    }
    return galleries
  })
}

const getGallery = (gallerySlug, galleries) => {
  // knowledge-subdomain path allows for caching with CloudFlare
  for (let gallery of galleries) {
    if (gallery.slug === gallerySlug) {
      // console.log("returned gallery:  ", gallery)
      return gallery
    }
  }
  return []
  ;

}

const getArticles = () => {
  let strapiUrl = `https://knowledge.sacshiki.com/articles`;
  // NOTE @cameron, maybe change the images to a cdn url?
  return fetch(strapiUrl)
    .then(response=>response.json())
}

const getArticle = (id) => {
  let strapiUrl = `https://knowledge.sacshiki.com/articles/`;
  return fetch(`${strapiUrl}${id}`)
    .then(response=>response.json())
}

export {
  getArticles,
  getArticle,
  getGalleries,
  getGallery,
  strapiUrl
}
