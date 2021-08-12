'use strict';

module.exports.hello = async (event) => {
  const body = JSON.parse(event.body)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      {
        message: 'Hello ' + body.name,
        input: event,
      },
      null,
      2
    ),
  };
};
