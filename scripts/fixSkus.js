const { getProducts } = require("./helpers");

const fixSkus = async() => {
    let products = await getProducts();
    console.log(products);
}

fixSkus();