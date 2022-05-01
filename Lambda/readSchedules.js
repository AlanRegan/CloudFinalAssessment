// Loads in the AWS SDK
const AWS = require('aws-sdk'); 

// Creates the document client specifing the region 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'}); 

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    await readSchedule().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.payment)
        });
        callback(null, {
            // If success return 200, and items
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true
            },
            body: data.Items,
        })
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err);
    })
};

// Reads 10 from the DynamoDb table schedule
// Returns promise
function readSchedule() {
    const params = {
        TableName: 'schedules',
        Limit: 10
    }
    return ddb.scan(params).promise();
}