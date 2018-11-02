module.exports = {
  port: process.env.PORT || 8080,
  db: {
    host: 'localhost',
    user: 'root',
    password: '0970lucy',
    database: 'board_schema',
  },
  developeType: process.env.DEV_TYPE || 'database'
  
};


// database: process.env.DB_NAME || '',
//     user: process.env.DB_USER || '',
//     password: process.env.DB_PASS || '',
//     option: {
//       dialect: process.env.DIALECT || 'sqlite',
//       host: process.env.HOST || 'localhost',
//       storage: './border.sqlite'
//     },