import Exception from '../exceptions/Exception.js';
import { Student } from '../models/index.js';
import { faker } from '@faker-js/faker';

const getAllStudents = async ({ size, page, searchString }) => {
	size = parseInt(size);
	page = parseInt(page);

	let filteredStudents = await Student.aggregate([
		{
			$match: {
				$or: [
					{
						name: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
					},
					{
						email: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
					},
					{
						address: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
					}
				]
			}
		},
		{ $skip: (page - 1) * size },
		{
			$limit: size
		}
	]);

	return filteredStudents;
};

const getStudentById = async (studentId) => {
	const student = await Student.findById(studentId);
	if (!student) {
		throw new Exception('Cannot find Student with id ' + studentId);
	}
	return student;
};

const insertStudent = async ({
	name,
	email,
	languages,
	gender,
	phoneNumber,
	address
}) => {
	try {
		const student = await Student.create({
			name,
			email,
			languages,
			gender,
			phoneNumber,
			address
		});

		return {
			...student._doc
		};
	} catch (exception) {
		if (exception.errors) {
			throw new Exception('Input error', exception.errors);
		}
	}
};

const updateStudent = async ({
	id,
	name,
	email,
	languages,
	gender,
	phoneNumber,
	address
}) => {
	const student = await Student.findById(id);

	student.name = name ?? student.name;
	student.email = email ?? student.email;
	student.languages = languages ?? student.languages;
	student.gender = gender ?? student.gender;
	student.phoneNumber = phoneNumber ?? student.phoneNumber;
	student.address = address ?? student.address;
	await student.save();
	return student;
};

async function generateFakeStudents() {
	let fakeStudents = [];
	for (let i = 0; i < 1000; i++) {
		let fakeStudent = {
			name: `${faker.name.fullName()}-fake`,
			email: faker.internet.email(),
			languages: [
				faker.helpers.arrayElement(['English', 'Vietnamese', 'French']),
				faker.helpers.arrayElement(['Korean', 'Japanese', 'Chinese'])
			],
			gender: faker.helpers.arrayElement(['Male', 'Female']),
			phoneNumber: faker.phone.number(),
			address: faker.address.streetAddress()
		};
		fakeStudents.push(fakeStudent);
	}
	debugger;
	await Student.insertMany(fakeStudents);
}

export default {
	getAllStudents,
	insertStudent,
	generateFakeStudents,
	getStudentById,
	updateStudent
};
