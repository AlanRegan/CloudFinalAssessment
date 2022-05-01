import boto3

s3_resource = boto3.resource('s3')

def lambda_handler(event, context):
    my_bucket = s3_resource.Bucket('paymentbackupbuckets00188509')
    # list of the files in the bucket
    files = list(my_bucket.objects.filter(Prefix='')) 
    # get the oldest file
    oldest_file = min(files, key = lambda file: file.last_modified) # select the oldest file in the bucket
    oldest_file_obj = s3_resource.Object(my_bucket.name, oldest_file.key) # get the object
    print(oldest_file_obj)
    oldest_file_obj.delete()