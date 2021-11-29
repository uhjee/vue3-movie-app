exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    // body : 문자열만 가능
    body: JSON.stringify({
      name: 'jee',
      age: 26,
      email: '1111@gmail.com',
    }),
  };
};
