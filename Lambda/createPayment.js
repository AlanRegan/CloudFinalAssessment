var AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

exports.handler = async (event, context, callback) => {
    const params = 
    {
        TableName: 'payments2',
        Item: 
        {
            paymentId: new Date().toISOString(),
            name: event.name,
            department: event.department,
            payment: event.payment
        }
    };

    callback(null, {event});
return ddb.put(params).promise();
};