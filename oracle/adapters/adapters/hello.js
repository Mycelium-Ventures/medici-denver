module.exports.default = async ({id, data}) => {
    const response = {
        statusCode: 200,
        body: {
            jobRunID: id,
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: data
          }
      };
    return response;
}