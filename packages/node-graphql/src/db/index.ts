import { readdirSync } from 'fs';
import { join } from 'path';
import { sequelize } from './instance';
import { Model } from 'sequelize';
import { UserModel } from './models/User';

export type ModelKeys = 'User'; 
export interface Models extends Record<ModelKeys, any> {
  User: UserModel;
}

const MODELS_PATH = join(__dirname, 'models');
const MODELS_PATHS = readdirSync(MODELS_PATH).map(path => join(MODELS_PATH, path));
const models: Models = {} as any;

console.log('MODELS_PATHS', MODELS_PATHS);

MODELS_PATHS.forEach(modelPath => {
  const model = sequelize.import(modelPath);

  models[model.name as ModelKeys] = model as any;
});

Object
  .keys(models)
  .forEach(modelName => {
    const model = models[modelName as ModelKeys];

    if (typeof model.associate === "function") {
      model.associate(models as any);
    }
  });

console.log('Models');
console.log(models);

export { models };
export const { User } = models;
