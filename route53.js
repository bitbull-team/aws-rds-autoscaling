'use strict';
const AWS = require('aws-sdk');
const route53 = new AWS.Route53();
const sns = require('./lib/sns.js');

module.exports.changeRecord = (event, context, callback) => {

  route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: [{
        Action: 'UPSERT',
        ResourceRecordSet: {
          Name: process.env.RecordName,
          Type: 'CNAME',
          ResourceRecords: [{
            Value: process.env.RecordValue
          }],
          TTL: 60
        }
      }],
      Comment: "managed by lambda"
    },
    HostedZoneId: process.env.HostedZoneId
  }, function(err, data){
    if(err){
      sns.error("Cannot change DNS record "+process.env.RecordName+" to value "+process.env.RecordValue, function(){
        callback(err);
      })
    }else{
      sns.notify(process.env.Msg, callback)
    }
  });

};
