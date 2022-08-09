'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });
const tableName = process.env.TABLE_NAME;
const handler = async (event, context) => {
    console.log("Incoming message from SQS :", event);
    try {
        for (const { body } of event.Records) {
            let data = JSON.parse(body);
            await dynamoDB.put({
                TableName: tableName,
                Item: data
            }).promise();
        }
        /* const {Records} = event;
        const data = JSON.parse(Records[0].body);
        let response:any;
        const params = {
          TableName:tableName,
          Item: data
        };
        response=await dynamoDB.put(params).promise(); */
        console.log('Successfully data sent to DynamoDB');
        /* response={
              statusCode :200,
              status :"success",
              result : "Data is sent to DynamoDB"
            };
            return response; */
    }
    catch (error) {
        console.error('Error in executing lambda function for SQS', error);
        console.error(error.message);
        console.error("Data can't be processed to DynamoDB", error);
        /* return{
          statusCode :500,
          body:JSON.stringify({Message:"Data can't be processed to DynamoDB", Error:error})
          
        }; */
        /* const err_response={
              statusCode :404,
              status :"failure",
              result : "Invalid Request"
            };
            return err_response; */
    }
};
exports.handler = handler;
//# sourceMappingURL=sqs2dynamo.js.map