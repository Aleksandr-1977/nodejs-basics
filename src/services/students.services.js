import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};
export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};
export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findOneAndDelete({
    _id: studentId,
  });
  return student;
};
export const putStudent = async (studentId, payload) => {
  const student = await StudentsCollection.findOneAndUpdate(payload);
  return student;
};
// const newStudent = {
//   name: 'Balaban',
//   email: 'jojndoe@mail.com',
//   age: 10,
//   gender: 'male',
//   avgMark: 10.3,
//   onDuty: true,
// };

// createStudent(newStudent)
//   .then((student) => console.log('Created student:', student))
//   .catch((error) => console.error('Error creating student:', error));
