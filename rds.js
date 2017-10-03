'use strict';
const AWS = require('aws-sdk');
const rds = new AWS.RDS();
const sns = require('./lib/sns.js');

module.exports.scale = (event, context, callback) => {

  rds.modifyDBInstance({
    DBInstanceIdentifier: process.env.InstanceIdentifier,
    DBInstanceClass: process.env.InstanceClass,
    ApplyImmediately: true
  }, function(err, data){
    if(err){
      sns.error("Cannot scale RDS instance "+process.env.InstanceIdentifier+" to "+process.env.InstanceClass, function(){
        callback(err);
      })
    }else{
      sns.notify(process.env.Msg, callback)
    }
  });

};
