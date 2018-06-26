import { User } from "./models/User";
import { UserRole, WeekWorkDayValues } from "./enums";
import { Cathedra, Classroom, Faculty, Group, Housing, Speciality, Worker } from "./models";

export async function initialization() {
  await User.create({
    username: 'alex_hi',
    firstName: 'Александр',
    lastName: 'Хижук',
    role: UserRole.ROOT,
    photo: 'https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png',
    password: '12345'
  });
  await Housing.bulkCreate([
    {
      name: 'Главный корпус',
      address: 'г. Королев, ул. Гагарина, д. 42',
      floors: 4,
      workTime: WeekWorkDayValues
    }
  ]);
  await Housing.bulkCreate([
    {
      name: 'Второй корпус',
      address: 'г. Королев, ул. Октябрьская, 10 а',
      floors: 4,
      workTime: WeekWorkDayValues
    }
  ]);
  await Housing.bulkCreate([
    {
      name: 'ККМТ',
      address: 'г. Королев, ул. Пионерская, 8',
      floors: 4,
      workTime: WeekWorkDayValues
    }
  ]);
  await Classroom.bulkCreate([
    {
      HousingId: 1,
      capacity: 30,
      floor: 1,
      number: 101
    }
  ]);
  await Faculty.bulkCreate([
    {
      name: 'Информационно-технологический факультет',
      ClassroomId: 1
    }
  ]);
  await Cathedra.bulkCreate([
    {
      name: 'Информационных технологий и управляющих систем',
      FacultyId: 1,
      ClassroomId: 1
    }
  ]);
  await Speciality.bulkCreate([
    {
      name: 'Информационные системы и технологии',
      code: '09.03.02',
      shortName: 'ИСТ'
    }
  ]);
  await Group.bulkCreate([
    {
      number: 1,
      year: 14,
      studentsCount: 10,
      SpecialityId: 1
    }
  ]);
  await Worker.bulkCreate([
    {
      firstName: "Александр",
      lastName: "Хижук",
      position: "Вселенского масштаба погромист",
      CathedraId: 1,
      FacultyId: 1
    }
  ]);
  await Worker.bulkCreate([
    {
      firstName: "Елена",
      lastName: "Штрафина",
      position: "Ст. преподаватель",
      CathedraId: 1,
      FacultyId: 1
    }
  ]);
  await Worker.bulkCreate([
    {
      firstName: "Татьяна",
      lastName: "Аббасова",
      position: "Доцент",
      CathedraId: 1,
      FacultyId: 1
    }
  ]);
  await Worker.bulkCreate([
    {
      firstName: "Александр",
      lastName: "Погодин",
      position: "Ст. науч. сотр.",
      CathedraId: 1,
      FacultyId: 1
    }
  ]);
}
