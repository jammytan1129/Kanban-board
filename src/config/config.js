module.exports = {
  port: process.env.PORT || 8080,
  developeType: process.env.DEV_TYPE || 'database',
  mongoose: {
    url: 'mongodb://test123:test123@ds157923.mlab.com:57923/board'
  }
};
