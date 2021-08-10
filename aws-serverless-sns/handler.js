'use strict';

module.exports.hello = async (event) => {
  const body = JSON.parse(event.body)
  return {
    statusCode: 200,
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
