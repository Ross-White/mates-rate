const createSub = async (topicARN, guest) => {
    try {
      const result = await axios({
        method: "post",
        url:
        "https://fvagknn9al.execute-api.us-east-1.amazonaws.com/dev/publish",
        headers: {
          "x-api-key": "44bw70Hmoq6ayQ9NvOqY85YTyJ0AbPJL2FniQImB",
          "Content-Type": "application/json",
        },
        data: {
          topicArn: topicARN,
          endpoints: [{ type: "email", value: guest }],
        },
      });
      console.log("create sub res:", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  };
