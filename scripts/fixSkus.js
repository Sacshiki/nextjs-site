import { getVariants, updateVariant, deleteVariant } from "./helpers.js";
import Engine from './sheets/engine.js';

const googleSheetId = '1cIJGkt_7IEG-s22WrXBToOA5rMkPcTNRftC37F8iLjk'
const sheetRange = 'Ready Inventory!C2:H'
const sacshikiId = 17;
const setSkus = false;
const checkDupes = false;

const getRows = (sheetId, sheetRange) => {
  return new Promise(function(resolve,reject) {
      Engine(sheetId,sheetRange).then(async(rows)=> {
          let filtered = rows.filter(function (el) {
              return (el != null && el !== "" && el !== " ");
            });
          resolve(filtered);
      })
  })
}
const fixSkus = async() => {

    let sheetVariants = await getSheetVariants()
    let variants = [];
    let skuList = []
    let page = 1;
    do {
        try {
            variants = await getVariants(sacshikiId, page);
            page++
            console.log(`Received ${variants.length} variants from WooCommerceRestApi`)
            for (let variant of variants) {
                if (setSkus) {
                    await setVariantSkus(sheetVariants, variant);
                } else if (checkDupes) {
                    const size = variant.attributes.find(dbV => dbV.name == 'Size')
                    console.log(size.option)
                } else {
                    await updatesSkuFromSheet(sheetVariants, variant);
                }
                
                skuList.push(variant.sku)
            }

        } catch (err) {
            console.error("Bad stuff: ", err)
        }
    } while (variants.length > 0)

    if (checkDupes) {
        console.log(skuList)
    }
    console.log("have new variants: ", variants.length)
}

const getSheetVariants = async() => {
    let sheetVariants = await getRows(googleSheetId,sheetRange)
    console.log(`Received ${sheetVariants.length} variants from Google Sheets`)
    return sheetVariants.map((sheetVar) => {
        return {
            design: sheetVar[0],
            color: sheetVar[1],
            size: sheetVar[2],
            hardware: sheetVar[3],
            sku: sheetVar[4],
            stock_quantity: sheetVar[5],
            title: `${sheetVar[0]} ${sheetVar[1]} ${sheetVar[2]} ${sheetVar[3]}`
        }
    })
}

const setVariantSkus = async(sheetVariants,dbVar) => {

    const color = dbVar.attributes.find(dbV => dbV.name == 'Color')
    const size = dbVar.attributes.find(dbV => dbV.name == 'Size')
    const design = dbVar.attributes.find(dbV => dbV.name == 'Design')
    const hardware = dbVar.attributes.find(dbV => dbV.name == 'Hardware')
    if (!size) {return}
    const sizeTitle = (size.option == 'Small') ? 'S' : 'L';
    const dbVarTitle = `${design.option} ${color.option} ${sizeTitle} ${hardware.option}`
    // Design / Color / Size / Hardware
    // Topography / Grey / S / Antique Brass
    const sheetVar = sheetVariants.find(shV => shV.title == dbVarTitle)
    if (!sheetVar || !sheetVar.sku) {
        console.error(`Missing Google Sheets on ${dbVarTitle}`)
        return;
    }
    console.log(dbVarTitle, sheetVar.sku, sheetVar.stock_quantity)
    try {
        if (dbVar.sku == '') {
            let newVar = await updateVariant(sacshikiId, dbVar.id, {
                sku: sheetVar.sku,
            })
            console.log(`Successfully updating product: ${newVar.sku} with stock: ${newVar.stock_quantity} ${newVar.stock_status}. SKU was ${dbVar.sku}`)
        }

    } catch (e) {
        console.log(`PUT on ${sheetVar.sku} gone bad`, e)
    }
    // console.log(`Updating sku ${dbVar.sku} from ${dbVar.stock_quantity} to ${invQty}`)
}
const updatesSkuFromSheet = async(sheetVariants,dbVar) => {
    const sheetVar = sheetVariants.find(shV => shV.sku == dbVar.sku)
    if (!sheetVar) {return}
    console.log(`update db: ${dbVar.sku}, from ${dbVar.stock_quantity} to ${sheetVar.stock_quantity}`)
    const stock_status = (sheetVar.stock_quantity == 0) ? 'outofstock' : 'instock';
    try {
        let newVar = await updateVariant(sacshikiId, dbVar.id, {
            regular_price: '60.00',
            price: '60.00',
            stock_quantity: sheetVar.stock_quantity || 1,
            stock_status: stock_status
        })
        console.log(`Successfully updating product: ${newVar.sku} with stock: ${newVar.stock_quantity} ${newVar.stock_status}`)
    } catch(err) {
        console.log("updateSkus ERR:", err)
    }

}

fixSkus();