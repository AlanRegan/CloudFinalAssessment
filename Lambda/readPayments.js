// Loads in the AWS SDK
const AWS = require('aws-sdk'); 

// Creates the document client specifing the region 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'}); 

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    await readPayment().then(data => {
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

// Function readPayments
// Reads 10 messages from the DynamoDb table payments
// Returns promise
function readPayment() {
    const params = {
        TableName: 'payments2',
        Limit: 10
    }
    return ddb.scan(params).promise();
}