"use strict";

const AWS = require("aws-sdk");

const sns = new AWS.SNS();

const createTopic = async (event) => {
  /**
   * Creates an SNS topic
   * @summary Takes a name and creates an SNS topic
   * @param {String} event.body.topicName - Name of the topic
   * @return {JSON} Returns a statusCode, a body that contains a message, topicArn or an Error.
   */
  try {
    const body = JSON.parse(event.body);
    const params = {
      Name: body.topicName /* required */,
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

module.exports = {
  createTopic,
};
