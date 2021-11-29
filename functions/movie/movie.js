// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');

const handler = async event => {
  const payload = JSON.parse(event.body);
  console.log({ event });

  try {
    // ! payload.apikey = Keys.OMDB_API_KEY;
    payload.apikey = '21b591';
    // id 여부로 개별 검색 or 다수 검색 분기 처리
    // if (payload.id) {
    //   payload.i = Keys.OMDB_ID;
    // }
    // }
    const url = 'https://www.omdbapi.com/';
    const { data } = await axios.get(url, { params: payload });

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
