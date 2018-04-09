import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize({
  host: 'postgres',
  dialect: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  sync: {
    force: true
  },
  logging: true,
  benchmark: true
});
