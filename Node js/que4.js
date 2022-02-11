const async = require('async')
const fs = require('fs');
const { encode, decode } = require('node-base64-image');
const { gzip, unzip } = require('node-gzip')
const path = require('path')


const options = {
    string: true,
    headers: {
        "User-Agent": "my-app"
    }
}




const urlArray = [
    "https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg",
    "https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg",
    "https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg",
    "https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg",
    "https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg",
    "https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg",
    "https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg"
]


// creating folder to store original images
fs.mkdirSync(path.join(__dirname, 'images'))

// initialising the folders to contain only 5 compressed images beacuse in asynchronous operation creating folders would take time and writing in the folders would return error
for (let i = 0; i < urlArray.length; i++) {
    if (i === 0) {
        fs.mkdirSync(path.join(__dirname, `compressedfolder${Math.floor(i / 5)}`));   // initialising first folder
    }
    else if (i % 5 == 0) {
        fs.mkdirSync(path.join(__dirname, `compressedfolder${Math.floor(i / 5)}`));   // if images count becomes greater than 5 this directory would be used to store
    }
}


// in question it is asked to download the images paralelly so using async.parallel and passing the first argument as an array of functions with parameter as //callback and in each operation the image is downloaded and stored in file system and the index of the image is printed before the images are saved in the folder,
//the second parameter is a callback which runs after all the images are downloaded parallely

async.parallel(
    // map return an array thats why map is used
    urlArray.map((url, index) => {
        return (callback) => {

            // encode returns a base64 string which is used to save the images

            encode(url, options).then(imagebase64string => {

                // saving the image in the images folder
                fs.writeFile(`./images/${index}.jpg`, imagebase64string, 'base64', err => {
                    if (err) {
                        console.log(`can't save url`);
                        throw err;
                    }

                    // once the image is saved, we will compress it 
                    //gzip takes bufferdata as an argument and returns the compressed buffer

                    fs.readFile(`./images/${index}.jpg`, (err, imagebuffer) => {
                        if (err) {
                            console.log('error in reading saved images');
                            throw err;
                        }
                        gzip(imagebuffer).then(compressedImage => {

                            // saving the compressed images to our folder using base64 encoding, which is used for images
                            fs.writeFile(`./compressedfolder${Math.floor(index / 5)}/${index}.jpg.zip`, compressedImage, 'base64', err => {
                                callback(err, 'compressed file saved successfully')
                            })
                        }).catch(e => {
                            console.log('image cant be compressed');
                            throw e;
                        })
                    })




                })
            })

            console.log(index);  //above operations will take some time to finish and since this function is asynchronous the index will be printed first

        }
    })
    ,

    // this is the final callback
    (err, result) => {
        if (err) {
            console.log('req failed', err);
        }
        console.log('all operations done successfully')
    }


)