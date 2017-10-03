'use strict';
const AWS = require('aws-sdk');
var route53 = new AWS.Route53();

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
  }, callback);

};
