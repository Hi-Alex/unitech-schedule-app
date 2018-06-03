import {
  DataTypeAbstract, DataTypes,
  DefineAttributeColumnOptions,
  DefineOptions,
  Instance,
  Model
} from "sequelize";
import * as Sequelize from 'sequelize';
import { sequelize } from "./instance";
import { isFunction } from 'lodash';

export interface DBInstance<Attributes> extends Instance<Attributes> {
  dataValues: Attributes;
}
export interface DBModel<Attributes> extends Model<DBInstance<Attributes>, Attributes> {}

export type DefineAttributeValue = string | DataTypeAbstract | DefineAttributeColumnOptions;
export type DefineAttributes<Attributes> = Record<keyof Attributes, DefineAttributeValue>;
export type DefineFnArg<T> = T | ((dataTypes: DataTypes, instance: Sequelize.Sequelize) => T);

const getValue = <T>(arg: DefineFnArg<T>): T => isFunction(arg) ? arg(Sequelize, sequelize) : arg;

export function defineModel<Attributes, ExtendInstance extends object = {}, ExtendModel extends object = {}>(
  name: string,
  attributes: DefineFnArg<DefineAttributes<Attributes>>,
  options?: DefineFnArg<DefineOptions<DBInstance<Attributes>>>
): Model<DBInstance<Attributes> & ExtendInstance, Attributes> & ExtendModel {
  return sequelize.define<DBInstance<Attributes>, Attributes>(name, getValue(attributes), options ? getValue(options) : void 0) as any;
}
export const ID_FIELD: DefineAttributeColumnOptions = {
  type: Sequelize.INTEGER(11),
  autoIncrement: true,
  primaryKey: true,
  allowNull: false,
  unique: true,
  field: 'id'
};
