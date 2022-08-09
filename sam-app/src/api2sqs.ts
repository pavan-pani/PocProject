import { APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent} from "aws-lambda";
import * as AWS  from 'aws-sdk';
AWS.config.update({region:'us-east-2'});
var sqs=new AWS.SQS();
const url = process.env.QUEUE_URL;
export const handler = async (event:any):Promise<APIGatewayProxyResult>=> {
  
  try{
    if(typeof event.StudentId!='number')
    { throw Error;}
      var params={
          MessageBody:JSON.stringify(event),
          QueueUrl:url
        };
        let response:any;
       
        response= await sqs.sendMessage(params).promise();
          response={
            statusCode :200,
            status :"success",
            result : "Data is sent to DynamoDB via SQS"
        }
        return response;
      } 
      
     
  catch(error){
    return{
          statusCode :500,
          body:JSON.stringify({Message:"Data can't be processed to DynamoDB", Error:error})
        };
         
       }
       
};

