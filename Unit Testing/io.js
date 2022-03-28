const { reject } = require('async');
var async  = require('async');
var request = require('request');


let token_auth = 'Bearer eb12cc405cdc4c73abb4703193a478d5';

let integrationInformation= {
  "exportConnection":"",
  "importConnection":"",
  "export":"",
  "import":"",
  "flow":"",
  "integration":""

}

let connection_data = {
  "exportConnectionID": "",
  "importConnectionID": "",
  "exportID":"",
  "importID": "",
  "integrationID" :"",
  "flowID" :""
};

let exportData = {
    "name": "export data via NodeJs",
    "_connectionId": connection_data["exportConnectionID"],
    "apiIdentifier": "e9483465fc",
    "asynchronous": true,
    "oneToMany": false,
    "sandbox": false,
    "parsers": [],
    "http": {
        "relativeURI": "/test/orders",
        "method": "GET",
        "successMediaType": "json",
        "errorMediaType": "json",
        "formType": "rest"
    },
    "rawData": "61d72cd44a21ff09370867f62fd3dff32edf43228774fdc613056b96",
    "adaptorType": "HTTPExport"
}

let importData = {
    "name": "ftp test import via NodeJs",
    "_connectionId": connection_data["importConnectionID"],
    "apiIdentifier": "i29f510d57",
    "oneToMany": false,
    "sandbox": false,
    "mapping": {
        "fields": [
            {
                "extract": "shipmethod",
                "generate": "SHIP METHOD"
            }
        ]
    },
    "file": {
        "fileName": "file-{{timestamp}}.json",
        "type": "json"
    },
    "ftp": {
        "directoryPath": "PrinceSharma",
        "fileName": "file-{{timestamp}}.json"
    },
    "adaptorType": "FTPImport"
}

let integrationData = {
    "name": "FTP Integration via NodeJs",
    "description": "test",
    "install": [],
    "sandbox": false,
    "_registeredConnectionIds": [
        connection_data["exportID"],
        connection_data["importID"]  
    ],
    "installSteps": [],
    "uninstallSteps": [],
    "flowGroupings": []
}

let flowData = {
    "name": "FTP Flow via NodeJs",
    "disabled": true,
    "_integrationId": connection_data["integrationID"],
    "skipRetries": false,
    "pageProcessors": [
        {
            "responseMapping": {
                "fields": [],
                "lists": []
            },
            "type": "import",
            "_importId": connection_data["importID"]
        }
    ],
    "pageGenerators": [
        {
            "_exportId": connection_data["exportID"],
            "skipRetries": false
        }
    ],
    "createdAt": "2022-03-14T16:52:10.992Z",
    "autoResolveMatchingTraceKeys": true
}

var ftpImportConnectionOptions = {
    'method': 'POST',
    'url': 'https://api.integrator.io/v1/connections',
    'headers': {
      'Authorization': token_auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "type": "ftp",
        "name": "ftp test conn via NodeJs",
        "offline": true,
        "sandbox": false,
        "ftp": {
            "type": "sftp",
            "hostURI": "celigo.files.com",
            "username": "prince.sharma@celigo.com",
            "password": "3W7YyOmn8N1w",
            "port": 22,
            "usePassiveMode": true,
            "userDirectoryIsRoot": false,
            "useImplicitFtps": false,
            "requireSocketReUse": false
        },
        "queues": [
            {
                "name": "622f7b37e710d226971f64b4",
                "size": 0
            }
        ]
    })

};


var restApiExportConnectionOptions = {
  'method': 'POST',
  'url': 'https://api.integrator.io/v1/connections',
  'headers': {
    'Authorization': token_auth,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "type": "http",
    "name": "rest api conn via Nopde Js",
    "sandbox": false,
    "http": {
        "formType": "rest",
        "mediaType": "json",
        "baseURI": "https://3jno0syp47.execute-api.us-west-2.amazonaws.com",
        "unencrypted": {
            "field": "value"
        },
        "encrypted": "******",
        "auth": {
            "type": "custom"
        }
    },
    "queues": [
        {
            "name": "62189936498aac58542c12c2",
            "size": 0
        }
    ]
  })

};


var restApiExportOptions = {
    'method': 'POST',
    'url': 'https://api.integrator.io/v1/exports',
    'headers': {
      'Authorization': token_auth,
      'Content-Type': 'application/json'
    },
};

var ftpImportOptions = {
    'method': 'POST',
    'url': 'https://api.integrator.io/v1/imports',
    'headers': {
      'Authorization': token_auth,
      'Content-Type': 'application/json'
    },
};

var createIntegrationOptions = {
    'method': 'POST',
    'url': 'https://api.integrator.io/v1/integrations',
    'headers': {
      'Authorization': token_auth,
      'Content-Type': 'application/json'
    },
  
};


var flowOptions = {
    'method': 'POST',
    'url': 'https://api.integrator.io/v1/flows',
    'headers': {
      'Authorization': token_auth,
      'Content-Type': 'application/json'
    },
  
};





const createRestApiExportConnection = (options) => {
  return new Promise((resolve, reject) => {
    request(options , function (error, response) {
      if (error){
          return reject(error)
      } 
      let data = JSON.parse(response.body);
      integrationInformation.exportConnection = data;
      connection_data["exportConnectionID"] = data["_id"];
      resolve(data["_id"]);
    }) 
  })
}

const createFtpImportConnection = (options) => {
  return new Promise((resolve, reject) => {
    request(options , function (error, response) {
      if (error){
          return reject(error)
      } 
      let data = JSON.parse(response.body);
      integrationInformation.importConnection = data;
      connection_data["importConnectionID"] = data["_id"];
      resolve(data["_id"]);
    }) 
  })

}

const createRestApiExport = (options) => {
  exportData["_connectionId"] = connection_data["exportConnectionID"];
  options.body = JSON.stringify(exportData);
  
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error){
          return reject(error);
      };
    
      
      let data = JSON.parse(response.body);
      integrationInformation.export = data;
      
      connection_data["exportID"] = data["_id"];
      resolve(data["_id"]);
  })

  })

}

const createFtpImport = (options) => {
  importData["_connectionId"] = connection_data["importConnectionID"];

  options["body"] = JSON.stringify(importData);

  return new Promise((resolve,reject) => {
    request(options , function (error, response) {
      if (error) {
          return reject(error)
      }
      let data = JSON.parse(response.body);
      integrationInformation.import = data;

      connection_data["importID"] = data["_id"];
      resolve(data["_id"]);
  })

  })
}

const createIntegration = (options) => {
  integrationData["_registeredConnectionIds"] = [
    connection_data["exportID"],
    connection_data["importID"]
  ];

  options["body"] = JSON.stringify(integrationData);
  // console.log(options)

  return new Promise((resolve,reject) => {
    request(options , function (error, response) {
      if (error) {
          return reject(error)
      }
      let data = JSON.parse(response.body);
      integrationInformation.integration = data;

      connection_data["integrationID"] = data["_id"];
      resolve(data["_id"]);
  })

  })


}

const createFlow = (options) => {
  flowData["_integrationId"] =  connection_data["integrationID"];
  flowData.pageProcessors[0]._importId = connection_data["importID"];
  flowData.pageGenerators[0]._exportId = connection_data["exportID"];

  options["body" ] = JSON.stringify(flowData);

  // console.log(options);

  return new Promise((resolve,reject) => {
    request(options , function (error, response) {
      if (error) {
          return reject(error)
      }
      let data = JSON.parse(response.body);
      integrationInformation.flow = data;

      connection_data["flowID"] = data["_id"];
      resolve(data["_id"]);
  })

  })


}





exports.runasync = () => {
  return new Promise((resolve,reject)=>{
  let arr = [];
  async.series([
    function(callback){
      createRestApiExportConnection(restApiExportConnectionOptions).then(obj => {
        // const obj = JSON.parse(res.body);
        exportConnectionID = obj._id;
        arr.push(obj);
        console.log(`Rest Api Export connection created with id ${obj}`);
        callback(null, obj);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    function(callback){
      createFtpImportConnection(ftpImportConnectionOptions).then(obj => {
        // const obj = JSON.parse(res.body);
        importConnectionID = obj._id;
        arr.push(obj);
        console.log(`FTP Import connection created with id ${obj}`);
        callback(null, obj);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    function(callback){
      createRestApiExport(restApiExportOptions).then(res => {
        console.log(`Rest Api Export created with id ${res}`);
        callback(null, res);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    function(callback){
      createFtpImport(ftpImportOptions).then(res => {
        console.log(`FTP Import created with id ${res}`);
        callback(null, res);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    function(callback){
      createIntegration(createIntegrationOptions).then(obj => {
        // const obj = JSON.parse(res.body);
        integrationID = obj._id;
        arr.push(obj);
        console.log(`New Integration created with id ${obj}`);
        callback(null, obj);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    function(callback){
      createFlow(flowOptions).then(res => {
        arr.push(res.body);
        console.log(`New Flow created with id ${res}`);
        callback(null, res);
      })
      .catch(err => {
        console.log(err);
        callback(err,null);
      })
    },
    
  ] , (err, res) => {
    if(err){
      return reject(err);
    };
    console.log("hello :::::::");
    console.log(arr);
    return resolve(integrationInformation);
  });
})

}


