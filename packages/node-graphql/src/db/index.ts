import { sequelize } from "./instance";
import { Cathedra, Classroom, Faculty, Group, Housing, Speciality } from "./models";
import { initialization } from "./initialization";

export * from './instance';
export * from './models';

Housing.hasMany(Classroom);
Faculty.hasOne(Classroom);
Faculty.hasMany(Speciality);
Cathedra.hasOne(Faculty);
Cathedra.hasOne(Classroom);
Speciality.belongsTo(Faculty);
Classroom.belongsTo(Faculty);
Classroom.belongsTo(Housing);
Group.hasOne(Speciality);

export async function syncDB() {
  await sequelize.sync({
    force: true,
    logging: true
  });
  await initialization();
}
