const dataArray = [
    {
        "channel": "A",
        "name": "shoe"
    },
    {
        "channel": "A",
        "name": "electronics"
    },
    {
        "channel": "B",
        "name": "apparel"
    },
    {
        "channel": "C",
        "name": "electronics"
    }
];


const groupObjectsBy = (arr, channel) => {

    let resObj = {};

    arr.map(item => {
        let itemChannel = item["channel"];
        if (resObj[itemChannel] === undefined) {
            resObj[itemChannel] = [];
        }
        resObj[itemChannel].push(item)


    })
    return resObj;
}


const resultObject = groupObjectsBy(dataArray, 'channel');
console.log(resultObject);
