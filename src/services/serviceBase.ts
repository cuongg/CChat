export default {
  url: {
    // HOST: 'http://10.0.142.114:8080/',
    // staging
    HOST: 'https://ssm-uat-api.vnpost.vn',
    login: 'api/TokenAuth/Authenticate',
  },
  statusCode: {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400],
  },
};
