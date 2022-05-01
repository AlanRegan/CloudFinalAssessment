var AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

exports.handler = async (event, context, callback) => {
    const params = 
    {
        TableName: 'schedules',
        Item: 
        {
            shiftId:new Date().toISOString(),
            name: event.name,
            shift: event.shift
        }
    };

   // callback(null, {event});
return ddb.put(params).promise();
};