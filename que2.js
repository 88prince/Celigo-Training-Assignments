const MetadataParser = function () {
    var _version;
    var _channel;
    var _keyField;

    this.setVersion = (v) => {
        _version = v;
    }

    this.setChannel = (c) => {
        _channel = c;
    }

    this.setkeyField = (k) => {
        _keyField = k;
    }

    this.getVersion = () => {
        return _version;
    }

    this.getChannel = () => {
        return _channel;
    }

    this.getkeyField = () => {
        return _keyField;
    }

    this.getkeyFields = (arr) => {

        let result = [];
        for (let obj of arr) 
        {
            let channelName = obj.channel;


            for (let metadata of dataArr) 
            {
                if (channelName === metadata.getChannel()) 
                {
                    result.push(metadata.getkeyField());
                }
            }
        }
        return result;
    }




}

const mydata1 = new MetadataParser();
mydata1.setVersion(1.0);
mydata1.setChannel("A");
mydata1.setkeyField("Key1");

const mydata2 = new MetadataParser();
mydata2.setVersion(2.0);
mydata2.setChannel("B");
mydata2.setkeyField("Key2");

const mydata3 = new MetadataParser();
mydata3.setVersion(3.0);
mydata3.setChannel("C");
mydata3.setkeyField("Key3");

const dataArr = [mydata1, mydata2, mydata3];

let res = mydata1.getkeyFields([{ channel: "A" }, { channel: "B" }, { channel: "C" }]);
console.log(res)
