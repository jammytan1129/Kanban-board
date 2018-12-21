module.exports = {
  port: process.env.PORT || 8080,
  developeType: process.env.DEV_TYPE || 'database',
  mongoose: {
    url: 'mongodb://test123:test123@ds157923.mlab.com:57923/board'
  },
  testMongoose: {
    url: 'mongodb://test123:test123@ds139934.mlab.com:39934/board_test'
  }
};
