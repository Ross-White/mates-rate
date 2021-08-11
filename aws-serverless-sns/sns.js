"use strict";

const AWS = require("aws-sdk");
const headersCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
},

const sns = new AWS.SNS();

const createTopic = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const params = {
      Name: body.topicName,
      Attributes: {
        DisplayName: `Mates Rates - ${body.topicName}`,
      },
    };

    const res = await sns.createTopic(params).promise();
    console.log(res);
    return {
      statusCode: 200,
      headers: headersCors,
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
    console.error(err);
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

const subscribeTopic = async ({ body }) => {
  try {
    const protocol = {
      email: "email",
      sms: "sms",
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
      headers: headersCors,
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
};

const publishMessage = async ({ body }) => {
  try {
    const { message, topicArn, subject, senderId } = JSON.parse(body);

    const parsedSenderId =
      senderId && senderId.substring(0, 11).split(" ").join("").toUpperCase();

    const publishParams = {
      Message: message,
      Subject: subject,
      TopicArn: topicArn,
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: parsedSenderId,
        },
      },
    };

    const res = await sns.publish(publishParams).promise();
    
    return {
      statusCode: 200,
      headers: headersCors,
      body: JSON.stringify(
        {
          message: `Succesfully sent message to subscribers!`,
          res,
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
          message: `Could not publish message.`,
          err,
        },
        null,
        2
      ),
    };
  }
};

module.exports = {
  createTopic,
  subscribeTopic,
  publishMessage,
};
