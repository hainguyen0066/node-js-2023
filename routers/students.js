import express from 'express';
import {
    userController,
    studentController,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getStudentByid)

router.post('/', studentController.insertStudent);
// patch insert or creare new student
router.patch('/', studentController.updateStudent)

export default router;