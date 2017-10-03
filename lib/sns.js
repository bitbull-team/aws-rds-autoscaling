'use strict';
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.notify = (msg, callback) => {

  sns.publish({
    Message: msg,
    TopicArn: process.env.NotificationSNS
  }, callback);

};

module.exports.error = (error, callback) => {

  sns.publish({
    Message: process.env.MsgError +": "+ error,
    TopicArn: process.env.NotificationSNS
  }, callback);

};
