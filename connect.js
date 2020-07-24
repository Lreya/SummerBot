const { MongoClient } = require("mongodb");
const { uri } = require('./config.json');
const mongo = new MongoClient(uri, {useUnifiedTopology: true});
let db, col;

async function run() {
  try {

    await mongo.connect();
    console.log("Connected correctly to server");
    db = mongo.db('summerbot');
    // col = db.collection('geardb');
    // console.log(db);
    // console.log(col);

    // db.runCommand();
    col = db.createCollection('geardb', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["discordID", "ap", "aap", "dp", "level", "character", "family", "class", "gearscore", "lastUpdated"],
          properties: {
            discordID: {
              bsonType: "string"
            },
            ap: {
              bsonType: "number",
              minimum: 0,
              maximum: 999
            },
            aap: {
              bsonType: "number",
              minimum: 0,
              maximum: 999
            },
            dp: {
              bsonType: "number",
              minimum: 0,
              maximum: 999
            },
            level: {
              bsonType: "number",
              minimum: 0,
              maximum: 99
            },
            character: {
              bsonType: "string"
            },
            family: {
              bsonType: "string"
            },
            class: {
              bsonType: "string"
            },
            gearscore: {
              bsonType: "number"
            },
            lastUpdate: {
              bsonType: "string"
            }
          }
      }
     }});


  //   let gear2 = {
  //     "discordID": 'zzz999',
  //     "ap": 999,
  //     "aap": 999,
  //     "dp": 999,
  //     "level": 61,
  //     "class": "witch"
  //   };
  //
  //   const p = await col.insertOne(gear2);
  //
  } catch (err) {
    console.log(err.stack);
    console.log('closing connection');
  }
  finally {
    // await mongo.close();
  }
}

module.exports = {
  connect: function() {
    run();
  }
}
module.exports.mongo = mongo;
// module.exports.db = db;
// module.exports.col = col;
