import csv
import boto3
import json
from datetime import datetime

table = 'payments2'
bucket = 'paymentbackupbuckets00188509'
filename = '/tmp/employees.csv'
dateTimeObj = datetime.now()
timestampStr = dateTimeObj.strftime("%b-%d-%Y.csv")
key = timestampStr

s3 = boto3.resource('s3')
dynamo = boto3.resource('dynamodb')
table = dynamo.Table(table)

def lambda_handler(event, context):

    with open(filename, 'w') as output_file:
        writer = csv.writer(output_file)
        header = True
        first_page = True
        
                # Paginate results
        while True:

            # Scan DynamoDB table
            if first_page:
                response = table.scan()
                first_page = False
            else:
                response = table.scan(ExclusiveStartKey = response['LastEvaluatedKey'])

            for item in response['Items']:

                # Write header row?
                if header:
                    writer.writerow(item.keys())
                    header = False

                writer.writerow(item.values())

            # Last page?
            if 'LastEvaluatedKey' not in response:
                break

    # Upload temp file to S3
    s3.Bucket(bucket).upload_file(filename, key)
