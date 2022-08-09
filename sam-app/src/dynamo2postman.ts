import { APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import * as AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB.DocumentClient({region:'us-east-2'});
const tableName = process.env.TABLE_NAME;


export const handler = async (event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>=> {
try{
        let response:any;
        const params ={
            TableName: tableName,
        }
         response=await dynamoDB.scan(params).promise();
        return{
            statusCode:200,
            body:JSON.stringify({data: response})
        }
        
    }
    catch(error){
        console.error('Error in executing lambda function for DynamoDB',error);
       /*  const response={
          statusCode :500,
          status :"failure",
          result : "Invalid Request"
        }; */
        return {
            statusCode:500,
            body:JSON.stringify({message:"Details not readd",Error:error})}
    }

};
