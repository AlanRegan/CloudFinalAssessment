import json
import boto3
import uuid

client = boto3.client('stepfunctions')

def lambda_handler(event, context):
    name_id = str(uuid.uuid1())
    name=event.get('name')
    department=event.get('department')
    payment=event.get('payment')
    input = { 'name': name, 'department': department, 'payment': payment }
    response = client.start_execution(
        stateMachineArn='arn:aws:states:eu-west-1:592307519951:stateMachine:PayrollProcessMachine',
        name=name_id, input=json.dumps(input)
        )
