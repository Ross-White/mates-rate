"use strict";

const AWS = require("aws-sdk");

const sns = new AWS.SNS();

const createTopic = async (event) => {

  try {
    const body = JSON.parse(event.body);
    const params = {
      Name: body.topicName,
      Attributes: {
        'DisplayName': `Mates Rates - ${body.topicName}`
      }
    };

    const res = await sns.createTopic(params).promise();
    console.log(res);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Topic created: ${body.topicName}`,
          topicArn: res.TopicArn,
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Topic creation error`,
          err,
        },
        null,
        2
      ),
    };
  }
};

const subscribeTopic = async ({body}) => {
  
  try {
    const protocol = {
      email: "email",
      sms: "sms"
    };
    const { topicArn, endpoints } = JSON.parse(body);
  
    const promises = endpoints.map(async (endpoint) => {

      const subscribeParams = {
        Protocol: protocol[endpoint.type],
        TopicArn: topicArn,
        Endpoint: endpoint.value,
        ReturnSubscriptionArn: false,
      };
    
      const res = await sns.subscribe(subscribeParams).promise();
      return res;
    });
    
    const subRes = await Promise.all(promises);
    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Succesfully subscribed to topic!`,
          responses: subRes,
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: `Subscription was unsuccesful.`,
          err,
        },
        null,
        2
      ),
    };
  }
}

module.exports = {
  createTopic,
  subscribeTopic
};
