
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: "http://shop.sacshiki.com",
    consumerKey: process.env.AUTH_KEY,
    consumerSecret: process.env.AUTH_SECRET,
    version: "wc/v3"
  });

// const WOO_URL = "http://shop.sacshiki.com/wp-json/wc/v3/"

module.exports.getProducts = async () => {
    return await callGetterStrapi('products')
}

callGetterStrapi = async (category) => {
    try {
        console.log(`getting => ', ${category}`)
        const response = await api.get(category, {
            per_page: 20, // 20 products per page
        })
        console.log(response)
        return response.data
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}