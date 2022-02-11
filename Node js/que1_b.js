const fs = require('fs');
const xml2js = require('xml2js');

const path = './example.xml';

// parsing xml data
const xmlToJason = (xml) => {

    let data;
    
    xml2js.parseString(xml, function (err, res) {

        if (err) {
            console.log('can not convert to json');
            throw err;

        }

        // parsing to json
        data = JSON.stringify(res);
          
    });

    return data;

}

async function readMyFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, content) => {
            if (err) {
                return reject(err);
            }
            return resolve(content);
        })
    })
}

const toJs = async (filepath) => {

    let xml = await readMyFile(filepath);
    return xmlToJason(xml);
}

toJs(path).then((res) => console.log(res)).catch(e => console.log('error'));
