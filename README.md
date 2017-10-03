## Automatic RDS scaling

Scale RDS replice instance in blue/green transferring momentarily the connection to master database

Lambda functions are invoked by CloudWatch cron-scheduled event in this sequence
```
08:00 routingToMaster
08:05 scaleUp
08:15 routingToReplica

15:00 routingToMaster
15:05 scaleDown
15:15 routingToReplica
```
this configuration give to RDS replica 10 minute for complete the scaling process and then re-pointing DNS to replica endpoint.
Is assumed the DNS propagation take around 5 minute.

Times are based on GMT+0 time zone.

### Getting Start

#### Serverless

Follow documentation at https://serverless.com/framework/docs/providers/aws/guide/intro/ to edit settings. A makefile is provided with deploy, invoke and logs command wrapping serverless commands.

#### Environment variables

Before launch commands create a file `credentials` (renaming `credentials.sample`) with correct AWS CLI profile to use declared in ~/.aws/credentials.
```
# AWS Credentials
export AWS_PROFILE = <aws profile>
```

Create a file `environment` (renaming `environment.sample`) with the the project's settings values
```
# AWS
export ENVIRONMENT = <stage | prod>
export AWS_REGION = <aws region>
export AWS_ACCOUNT_ID = <aws account id>

# DNS
export HostedZoneId =
export RecordName =
export MasterEndpoint =
export ReplicaEndpoint =

# Database
export InstanceIdentifier =
export InstanceClassSmall =
export InstanceClassBig =
```

#### Deploy

Use a make command to deploy
`make deploy`

### Debug

Get function log
`make logs func="test"`

Invoke function remotly
`make invoke func="test"`
