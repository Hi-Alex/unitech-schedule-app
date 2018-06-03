import { sequelize } from "./instance";
import { Cathedra, Classroom, Faculty, Group, Housing, IClassroomAttributes, Speciality } from "./models";
import { WeekDay } from "./enums";
import { flatten } from 'lodash';

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

const generateClassrooms = (length = 50, floors = 3): IClassroomAttributes[] => flatten(new Array(floors).fill(0).map((_, floor) => (
  new Array(length).fill(0).map((_, value) => ({
    floor: floor + 1,
    number: `${floor + 1}${((value + 1) + '').padStart(2, '0')}`,
    capacity: Math.ceil(Math.random() * 100) + 15
  }))
)));

export async function syncDB() {
  await sequelize.sync({
    force: true,
    logging: true
  });
  await Housing.create({
    name: 'First',
    address: 'Smth',
    floors: 2,
    workTime: [WeekDay.MONDAY, WeekDay.FRIDAY],
    Classrooms: generateClassrooms()
  }, {
    include: [Classroom]
  });
  const faculty = Faculty.build({
    name: 'Super faculty'
  });

  await faculty.save();
  await (faculty as any).setClassroom(await Classroom.findById(1));
  await Housing.bulkCreate([
    {
      name: 'Second',
      address: 'Hell',
      floors: 22,
      workTime: [WeekDay.MONDAY, WeekDay.FRIDAY, WeekDay.WEDNESDAY]
    }
  ]);
}
