"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-2' });
var sqs = new AWS.SQS();
const url = process.env.QUEUE_URL;
const handler = async (event) => {
    try {
        if (typeof event.StudentId != 'number') {
            throw Error;
        }
        var params = {
            MessageBody: JSON.stringify(event),
            QueueUrl: url
        };
        let response;
        response = await sqs.sendMessage(params).promise();
        response = {
            statusCode: 200,
            status: "success",
            result: "Data is sent to DynamoDB via SQS"
        };
        return response;
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ Message: "Data can't be processed to DynamoDB", Error: error })
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=api2sqs.js.map