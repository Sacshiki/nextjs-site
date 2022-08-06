
import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = pkg.default;


const api = new WooCommerceRestApi({
    url: "http://shop.sacshiki.com",
    consumerKey: process.env.AUTH_KEY,
    consumerSecret: process.env.AUTH_SECRET,
    version: "wc/v3"
  });

// const WOO_URL = "http://shop.sacshiki.com/wp-json/wc/v3/"

export async function getProducts() {
    return await callGetterStrapi('products')
}

export async function getVariants(productId, page = 1) {
    return await callGetterStrapi(`products/${productId}/variations`, page)
}

export async function updateVariant(productId, variantId, data) {
    return await callPutterStrapi(`products/${productId}/variations/${variantId}`, data)
}

export async function deleteVariant(productId, variantId) {
    return await callDeleteStrapi(`products/${productId}/variations/${variantId}`)
}

const callDeleteStrapi = async (category) => {
    try {
        console.log(`deleting => , ${category}`)
        const response = await api.delete(category, {force: true})
        // console.log(response)
        return response.data
    } catch (err) {
        console.error(err.response.data)
        throw new Error(err)
    }
}

const callGetterStrapi = async (category, page) => {
    try {
        console.log(`getting => , ${category}`)
        const response = await api.get(category, {
            per_page: 20, // 20 products per page
            page: page,
        })
        // console.log(response)
        return response.data
    } catch (err) {
        console.error(err.response.data)
        throw new Error(err)
    }
}
const callPutterStrapi = async (category, data) => {
    try {
        console.log(`putting => , ${category}`)
        const response = await api.put(category, data)
        // console.log(response)
        return response.data
    } catch (err) {
        console.error(err.response.data)
        throw new Error(err)
    }
}