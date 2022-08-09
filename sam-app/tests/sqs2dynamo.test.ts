'use strict';
import 'mocha';
import {assert, expect} from 'chai';
import { APIGatewayProxyEvent, SQSEvent } from 'aws-lambda';
let event:any;
let context = {"functionName": "handler", "functionVersion": "$LATEST"};

event={
    Records: [
        {
          messageId: '9367db27-5cc5-4f3d-b5e4-37cdc10465be',
          receiptHandle: 'AQEBOQEJjpg5h6ybXKw/NSpXFs9XtFmfEb0un+BEYvOHjZLN1mq/3RIPusBFknovPJTgl/rdNxN8UtYOMS5ewk5irzXOvTEx/ODxE6bN8iYQw+a+1dmbrEqGFVxJnAGB2AKPGni3ezUJxOB0mqdcm6W9aks5u4iqrQ1Pdl594/w6RHhy5Ty8+gxQMdCyuhlRqa1eWwKF4jn/gCvDJZeq2EdvWy5B3hjnhydbBTgLdu21OsK92+UFdGELDNR22O3HQZBDRhXRplejTyn+EGC6NKhT/SiEIhMuX+z2QNdI2xS8xAuKinE2Hm8h9DZmFQzQxfiPwhZBb+xil0IKuAs7GxCAryP1fI5Ss+n3Owt9TVpW8mGEL7rkBVdaPz6EF5nYdAAziKoiaJY1J+wYsyfs/exXHj6/2Zgwjnt5U98GcAx7FRM=',
          body: '{"StudentId":299,"StudentName":"pavan","StudentMarks":900}',
          attributes: [Object],
          messageAttributes: {},
          md5OfBody: '4db2f958eef44d7234de8c0793f1028a',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:us-east-2:208948801701:poc3-MySqsQueue-IcmZ6o5JLmn6',
          awsRegion: 'us-east-2'
        }
      ]
    }

describe("Testing the function ", function(){
    it("Testing the Event Body TO be an Object ", async function() {
        let data=JSON.parse(event.Records[0].body);
        expect(data).to.be.an('object');
        
    })
    it("Testing the Event Body To Be String", async function() {
        
        expect(event.Records[0].body).to.be.an('string');
        
        
    })
    
})