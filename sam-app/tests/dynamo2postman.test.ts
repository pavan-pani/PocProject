'use strict';
import 'mocha';
import {assert, expect} from 'chai';
import {APIGatewayProxyEvent} from "aws-lambda";
const app = require("../src/sqs2dynamo");
let event: APIGatewayProxyEvent;
let context = {"functionName": "handler", "functionVersion": "$LATEST"};

describe('test cases', function(){
    it('invoke lambda function with success response', async function(){
        let response:any;
        try{
            response=await app.handler(event, context);
        }
        catch(error){
            assert.equal(response.statusCode,200, 'return response code with 200 in HTTP')
        }
    })
    it('invoke lambda function with failure response', async function() {
        let response:any;
        try{
            response=await app.handler(event, context);
        }
        catch(error){
            assert.equal(response.statusCode,500, 'return response code with 500 in HTTP')
        }
    })
});