'use strict'
import { SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk'
import { Context } from 'aws-sdk/clients/autoscaling';
const dynamoDB = new AWS.DynamoDB.DocumentClient({region:'us-east-2'});
const tableName = process.env.TABLE_NAME;

export const handler = async (event:SQSEvent,context:Context): Promise<void>=> {
  console.log("Incoming message from SQS :", event);
  try{

    
    const {Records} = event;
    const data = JSON.parse(Records[0].body);
    let response:any;
    const params = {
      TableName:tableName,
      Item: data
    };
    response=await dynamoDB.put(params).promise(); 
    console.log('Successfully data sent to DynamoDB');
     response={
          statusCode :200,
          status :"success",
          result : "Data is sent to DynamoDB"
        };
        return response;
  }
  catch(error){
    console.error('Error in executing lambda function for SQS',error);

    console.error(error.message);
            console.error("Data can't be processed to DynamoDB",error);
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

