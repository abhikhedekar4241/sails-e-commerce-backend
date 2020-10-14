const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let clientRef=null;
// Connection URL
const url = sails.config.datastores.default.url;
console.log(url);

MongoClient.connect(url, async(err, client)=> {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  clientRef=client;
  //client.close();
});
module.exports={
  connectData:async function(){
    return clientRef;
  }
};
