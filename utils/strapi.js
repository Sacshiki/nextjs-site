const fetch = require("node-fetch");

// getImages returns an array of JSON slide objects as a promise
// example return:
// [
  // {
    // Title: "Girl Mini Bag",
    // slug: "girl-mini-bag",
    // createdAt: "2019-12-03T18:23:32.723Z",
    // updatedAt: "2019-12-03T18:24:00.542Z",
    // Description: "Easy access to all your most important things",
    // Image: {
      // _id: "5de6a8241a85b10017771e45",
      // name: "IMG_20191013_164602.jpg",
      // sha256: "J-lrTiTBwvmN312jHsb1rGAWXY4u3vXTrGfs2C9ivag",
      // hash: "73a43a844f7b49f687d49986646f6c48",
      // ext: ".jpg",
      // mime: "image/jpeg",
      // size: "83.69",
      // url: "/uploads/73a43a844f7b49f687d49986646f6c48.jpg",
      // id: "5de6a8241a85b10017771e45"
    // },
    // id: "5de6a8241a85b10017771e44"
  // }...
// ]
const getImages = (gallerySlug) => {
  let strapiUrl = 'https://sacshiki-knowledge.herokuapp.com/galleries';
  return fetch(strapiUrl)
  .then(response=>response.json())
  .then(data=>{
    let slides = [];
    for (let i = 0; i < data.length; i++) {
      let title = data[i].slug
      if (title === gallerySlug) {
        slides = data[i].slides;
      }
    };
    return slides;
  })
}

const strapiUrl = "https://sacshiki-knowledge.herokuapp.com";

exports.getImages = getImages;
exports.strapiUrl = strapiUrl;
