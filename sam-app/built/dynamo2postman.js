"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });
const tableName = process.env.TABLE_NAME;
const handler = async (event) => {
    try {
        let response;
        const params = {
            TableName: tableName,
        };
        response = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ data: response })
        };
    }
    catch (error) {
        console.error('Error in executing lambda function for DynamoDB', error);
        /*  const response={
           statusCode :500,
           status :"failure",
           result : "Invalid Request"
         }; */
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Details not readd", Error: error })
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=dynamo2postman.js.map