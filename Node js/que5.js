const turl = require('turl');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

let urlArray = ["https://www.google.com", "https://www.twitter.com", "https://www.celigo.com", "https://www.udemy.com", "https://www.facebook.com"];

const convertCSV = createCSVWriter({
    path: './url-shorten-csv.csv',
    header: [
        { id: 'new_url', title: 'SHORTURL' },
        { id: 'url', title: 'URL' },
    ]

})


const mainFunction = async (urlArray) => {

    let arr = await Promise.all(urlArray.map(url => turl.shorten(url)));
    let jsonArr = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = {};
        obj.new_url = arr[i];
        obj.url = urlArray[i];
        jsonArr.push(obj);
    }

    await convertCSV.writeRecords(jsonArr);

}

mainFunction(urlArray);