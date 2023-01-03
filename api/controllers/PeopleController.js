const db = require('../models');

class PeopleController {

	static findAllPeople = async (req, res) => {

		const query = req.query;
		try {

			if (Object.values(query) == false) {

				const people = await db.People.findAll();
				return res.status(200).json(people);
			}

			const people = await db.People.findAll({
				where: query
			});

			if (!people) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...');

			res.status(200).json(people);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findAllPeopleActive = async (req, res) => {

		const query = req.query;
		try {

			if (!query) {
				const search = await db.People.scope('justActive').findAll();
				return res.status(200).json(search);
			}

			const search = await db.People.scope('justActive').findAll({
				where: query
			});

			if (!search) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...');

			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findPerson = async (req, res) => {

		const { id } = req.params;
		try {
			const search = await db.People.findOne({
				where: {
					id: Number(id)
				}
			});
			res.status(200).json(search);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static updatePerson = async (req, res) => {

		const body = req.body;
		const { id } = req.params;

		try {

			const updatedPerson = await db.People.update(body, {
				where: {
					id: id
				}
			});

			console.log(updatedPerson);

			res.status(200).json(updatedPerson);
		} catch (err) {

			res.status(500).json(err.message);
		}

	};

	static addPerson = async (req, res) => {

		const person = req.body;
		try {

			const personCreated = await db.People.create(person);

			res.status(200).json(personCreated);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removePersonById = async (req, res) => {

		const { id } = req.params;
		try {
			const search = await db.People.destroy({
				where: {
					id: Number(id)
				}
			});

			if (search === 0) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

			res.status(200).json('Success delete :,)');
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removePersonByQuery = async (req, res) => {

		const query = req.query;
		try {
			const search = await db.People.destroy({
				where: query
			});

			console.log(search);

			res.status(200).json(search);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static cancelPeople = async (req, res) => {

		const { student_id } = req.params;

		try {

			await db.sequelize.transaction(async (t) => {

				await db.People.update({ active: false }, {
					where: {
						id: Number(student_id)
					}
				}, { transaction: t });

				await db.Matriculations.update({ status: 'canceled' }, {
					where: {
						student_id: Number(student_id)
					}
				}, { transaction: t });

				res.status(200).json(`All matriculations of Student with ID ${student_id} have been canceled.`);
			});

		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static restorePerson = async (req, res) => {
		const { id } = req.params;

		try {
			const request = await db.People.restore({
				where: { id: Number(id) }
			});

			console.log(request);

			res.status(200).json(request);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	/* Matriculation Controller */

	//Review this part 
	static findAllMatriculation = async (req, res) => {

		try {

			const matriculations = await db.Matriculations.findAll();

			res.status(200).json(matriculations);
		} catch (err) {

			res.status(500).json(err.mensagem);
		}
	};

	static findMatriculationsByClass = async (req, res) => {

		const { class_id } = req.params;

		try {
			const matriculations = await db.Matriculations
				.findAndCountAll({
					where: {
						class_id: Number(class_id),
					},
					order: [
						['student_id', 'ASC']
					]
				});
			res.status(200).json(matriculations);
		} catch (err) {

			res.status(500).json('nada aqui');
		}
	};

	static findAllMatriculationOfStudent = async (req, res) => {

		const { student_id } = req.params;

		try {
			const student = await db.People.findOne({ where: { id: Number(student_id) } });
			const allMatriculationOfStudent = await student.getConfirmedMatriculations();

			res.status(200).json(allMatriculationOfStudent);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findMatriculationOfStudent = async (req, res) => {

		const { student_id, matriculation_id } = req.params;
		try {

			const search = await db.Matriculations.findAll({
				where: {
					id: matriculation_id,
					student_id
				}
			});
			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static addStudentMatriculation = async (req, res) => {

		const { student_id } = req.params;
		const newRegistration = req.body;
		try {

			const search = await db.Matriculations.create({
				...newRegistration,
				student_id
			});
			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static updateStudentMatriculation = async (req, res) => {

		const updateBody = req.body;
		const { student_id, matriculation_id } = req.params;

		try {

			const updatedMatriculation = await db.Matriculations.update(updateBody, {
				where: {
					id: matriculation_id,
					student_id
				}
			});

			if (!updatedMatriculation[0]) throw new Error();

			const returnUpdateMatriculation = await db.Matriculations.findOne({
				where: {
					id: matriculation_id,
					student_id
				}
			});
			res.status(200).json(returnUpdateMatriculation);
		} catch (err) {

			res.status(500).json('Não foi dessa vez meu caro, reveja os dados enviados');
		}

	};

	static removeStudentMatriculation = async (req, res) => {

		const { student_id, matriculation_id } = req.params;

		try {

			const search = await db.Matriculations.destroy({
				where: {
					id: Number(matriculation_id),
					student_id
				}
			});

			if (search === 0) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

			res.status(200).json('Success delete :,)');
		} catch (err) {

			res.status(500).json(err.message);
		}
	};
}

module.exports = PeopleController;