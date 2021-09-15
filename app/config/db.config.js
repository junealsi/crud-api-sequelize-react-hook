module.exports = {
  HOST: "localhost",
  USER: "jagokode",
  PASSWORD: "sapigila",
  DB: "neps_reacthook",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// pool is optional. it will be used for Sequelize connection pool config
// max: maximum number of connection in pool
// min: minimum number of connection in pool
// idle: maximum time, in milliseconds, that a connection can be idle before being released
//acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
