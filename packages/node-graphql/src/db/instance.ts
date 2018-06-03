import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  dialect: process.env.DB_DIALECT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  sync: {
    force: true
  },
  logging: true,
  benchmark: true
});
