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
            slide.mobileLink = slide.Image_mobile.url
          }
        }
    }
    return galleries
  })
}

const getGallery = (gallerySlug, galleries) => {
  // knowledge-subdomain path allows for caching with CloudFlare
  let gallery = galleries.find(gal=>gal.slug == gallerySlug)
  if (process.env.ENVIRONMENT == "test" && gallery.slides) {
    for (let slide of gallery.slides) {
      slide.link = slide.link.replace('https://cdn.sacshiki.com','https://storage.googleapis.com/cdn.sacshiki.com')
    }
  }
  return gallery
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
