// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');
const { OMDB_API_KEY } = process.env;

/**
 * netlify serverless function 을 사용해 api 호출 부분 마이그레이션
 * proxy 역할과 유사
 *
 * @param event 현 함수로 api 요청을 보내는 요청에 대한 객체(http header, body 등)
 */
const handler = async event => {
  const payload = JSON.parse(event.body);
  // console.log({ event });

  try {
    const url = 'https://www.omdbapi.com/';
    const { data } = await axios.get(url, {
      params: {
        ...payload,
        apikey: OMDB_API_KEY,
      },
    });

    if (data.Error) {
      return {
        statusCode: 400, //Bad Request
        body: data.Error,
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message.toString(),
    };
  }
};

module.exports = { handler };
