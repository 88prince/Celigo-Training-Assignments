const request = require('request');
const fs = require('fs');
const url = 'https://www.google.com';

const getBody = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        })
    })
}





getBody(url).then((body) => {

    fs.writeFile('./google.html', body, (err) => {
        if (err) {
            console.log('file cant be created', err);
        }
        console.log('file created');
    })

})
    .catch(e => {
        console.log(e);
        throw e;

    })