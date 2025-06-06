import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.services.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
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

export const createStudentsController = async (req, res, next) => {
  try {
    if (req.user.role !== 'PARENT') {
      req.body.parentId = req.user._id;
    }
    const photo = req.file;
    let photoUrl;
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }
    const studentData = {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }),
    };
    const student = await createStudent(studentData);
    res.status(201).json({
      status: 201,
      message: `Successfully created a student!`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};
export const patchStudentController = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }

    const updateData = {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }),
    };

    const result = await updateStudent(studentId, updateData);

    if (!result) {
      return next(createHttpError(404, 'Student not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a student!',
      data: result.student,
    });
  } catch (error) {
    next(error);
  }
};
