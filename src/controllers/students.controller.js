import {
  createStudent,
  getAllStudents,
  getStudentById,
} from '../services/students.services.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();
  res.status(200).send({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};
export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  res.status(200).send({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
export const createStudentsController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};
