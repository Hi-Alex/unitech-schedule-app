import { sequelize } from "./instance";
import { Cathedra, Classroom, Faculty, Group, Housing, Speciality, Worker } from "./models";
import { initialization } from "./initialization";

export * from './instance';
export * from './models';

Housing.hasMany(Classroom);
Faculty.hasOne(Classroom);
Faculty.hasMany(Speciality);
Faculty.hasMany(Cathedra);
Faculty.hasMany(Worker);
Cathedra.belongsTo(Faculty);
Cathedra.hasOne(Classroom);
Cathedra.hasMany(Worker);
Speciality.belongsTo(Faculty);
Speciality.hasMany(Group);
Classroom.belongsTo(Faculty);
Classroom.belongsTo(Housing);
Group.belongsTo(Speciality);
Worker.belongsTo(Cathedra);
Worker.belongsTo(Faculty);

export async function syncDB() {
  await sequelize.sync({
    force: true,
    logging: true
  });
  await initialization();
}
