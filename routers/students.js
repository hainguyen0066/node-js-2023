import express from 'express';
const router = express.Router();
import {
    studentController,
} from '../controllers/index.js';


router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getStudentById);

router.post('/', studentController.insertStudent);
// patch insert or creare new student
router.patch('/', studentController.updateStudent)

router.post('/generateFakeStudents', studentController.generateFakeStudents);

export default router;