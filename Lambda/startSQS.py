import json
import boto3

def lambda_handler(event, context):
    client = boto3.client("sqs")
    response = client.send_message(
        QueueUrl="https://sqs.eu-west-1.amazonaws.com/592307519951/SQSLambdaAddToSchedule", 
        MessageBody=json.dumps(event)
    )

    print(response)
    return event
    