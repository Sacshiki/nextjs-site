const fetch = require("node-fetch");

const strapiUrl = "https://knowledge.sacshiki.com/";

const getGalleries = () => {

  let strapiUrl = `https://knowledge.sacshiki.com/galleries`;
  return fetch(strapiUrl)
  .then(response=>response.json())
  .then(galleries=>{
    for (let gallery of galleries) {
      gallery.slides = gallery.slides.filter(sl=> sl.Image && sl.Image.url )
        for (let slide of gallery.slides) {
          // cdn path allows for caching with CloudFlare

          slide.link = slide.Image.url
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

const getFullArticle = (slug) => {
  return fetch(`${strapiUrl}articles/${slug}`)
    .then(response=>response.json())
}

const getArticle = (articleSlug, articles) => {
  for (let article of articles) {
    if (article.slug === articleSlug) {
      return article
    }
  }
  return [];
}


export {
  getArticles,
  getFullArticle,
  getArticle,
  getGalleries,
  getGallery,
  strapiUrl
}
