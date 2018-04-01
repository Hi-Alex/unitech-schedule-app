import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize({
  host: 'postgres',
  dialect: 'postgres',
  username: 'postgres',
  password: 'qwerty',
  database: 'test_1',
  sync: {
    force: true
  },
  logging: true,
  benchmark: true
});
