'use strict';
const AWS = require('aws-sdk');
const rds = new AWS.RDS();

module.exports.scale = (event, context, callback) => {

  rds.modifyDBInstance({
    DBInstanceIdentifier: process.env.InstanceIdentifier,
    DBInstanceClass: process.env.InstanceClass,
    ApplyImmediately: true
  }, callback);

};
