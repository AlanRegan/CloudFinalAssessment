var AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

exports.handler = async (event, context, callback) => {
    let incomingEvent = JSON.parse(event.Records[0].body);
    let eventname = incomingEvent.name;
    let eventshift = incomingEvent.shift;
    const params =
    {
        TableName: 'schedules',
        Item:
        {
            shiftId: new Date().toISOString(),
            name: eventname,
            shift: eventshift
        }
    };

    console.log("successfully processed");
    return ddb.put(params).promise();
};