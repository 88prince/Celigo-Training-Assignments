var fs = require('fs');
var xml2js = require('xml2js');


//xml data
var xmldata = `<person >
<name>Prince Sharma</name>
<title>Engineering Intern</title>
<title>Student</title>
<team>Core</team>
<age>21</age>
<about> Final Year CSE Student at VNIT Nagpur </about>
</person>`;
  
// parsing xml data
const xmlToJason = (xml) => {

    let data;
    
    xml2js.parseString(xmldata, function (err, results) {

        if (err) {
            console.log('can not convert to json');
            throw err;

        }

        // parsing to json
        data = JSON.stringify(results)
          
    });

    return data;

}

let jsonData = xmlToJason(xmldata);
// display the json data
console.log(jsonData);
