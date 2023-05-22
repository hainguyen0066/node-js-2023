import {body, validationResult} from 'express-validator';

const getAllStudents = async (req, res) => {
    res.send('get all students');
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