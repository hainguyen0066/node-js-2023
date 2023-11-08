// import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

const getAllStudents = async (req, res) => {
    res.status(HttpStatusCode.OK).json({
        message: 'Get all students',
        data: [
            {
                name: 'student 1',
                email: 'test@example.com',
                age: 18
            },
            {
                name: 'student 2',
                email: 'test1@example.com',
                age: 18
            },
            {
                name: 'student 3',
                email: 'test2@example.com',
                age: 18
            }
        ]
    })
}

const getStudentByid = async (req, res) => {

}

const updateStudent = async (req, res) => {

}

const insertStudent = async (req, res) => {

}

export default {
    getAllStudents,
    getStudentByid,
    updateStudent,
    insertStudent
}