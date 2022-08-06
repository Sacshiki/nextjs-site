import Engine from './engine.js';

const googleSheetId = '1cIJGkt_7IEG-s22WrXBToOA5rMkPcTNRftC37F8iLjk'
const sheetRange = 'Ready Inventory!C2:H'

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

const init = async() => {
  let rows = await getRows(googleSheetId,sheetRange)
  let templateArr = []
  for (let row of rows) {
    templateArr.push(row[0])
  }
  console.log("Arr: ", templateArr)

}

init()