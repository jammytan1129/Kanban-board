module.exports = {
  port: process.env.PORT || 8080,
  developeType: process.env.DEV_TYPE || 'database',
  mongoose: {
    url: 'mongodb://test123:test123@ds157923.mlab.com:57923/board'
  }
};


// database: process.env.DB_NAME || '',
//     user: process.env.DB_USER || '',
//     password: process.env.DB_PASS || '',
//     option: {
//       dialect: process.env.DIALECT || 'sqlite',
//       host: process.env.HOST || 'localhost',
//       storage: './border.sqlite'
//     },