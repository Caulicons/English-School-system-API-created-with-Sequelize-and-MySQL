

const { PeopleService } = require('../services');
const Service = new PeopleService();

const { MatriculationsService } = require('../services');
const ServiceM = new MatriculationsService();
class PeopleController {

	static findAllPeople = async (req, res) => {

		const query = req.query;
		try {

			if (Object.values(query) == false) {

				const people = await Service.getAllRegistry();
				return res.status(200).json(people);
			}

			const people = await Service.getAllRegistry(query);
			if (!people) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...');

			res.status(200).json(people);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findAllPeopleActive = async (req, res) => {

		try {

			const peopleActive = await Service.getAllActivePeople();
			if (!peopleActive) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...');
			res.status(200).json(peopleActive);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findPerson = async (req, res) => {

		const { id } = req.params;
		try {
			const person = await Service.getRegistryByID(id);
			res.status(200).json(person);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static updatePerson = async (req, res) => {

		const body = req.body;
		const { id } = req.params;

		try {

			const updatedPerson = await Service.updateRegistry(body, id);
			res.status(200).json(updatedPerson);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static addPerson = async (req, res) => {

		const person = req.body;
		try {

			const personCreated = await Service.addRegistry(person);

			res.status(200).json(personCreated);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removePersonById = async (req, res) => {

		const { id } = req.params;
		try {
			const person = await Service.deleteRegistryByID(id);

			if (!person) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

			res.status(200).json('Success delete :,)');
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removePersonByQuery = async (req, res) => {

		const query = req.query;
		try {
			const search = await Service.getRegistryByQuery(query);

			res.status(200).json(search);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static cancelPeople = async (req, res) => {

		const { student_id } = req.params;

		try {

			await Service.cancelPerson(student_id);

			res.status(200).json(`All matriculations of Student with ID ${student_id} have been canceled.`);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static restorePerson = async (req, res) => {
		const { id } = req.params;

		try {
			const request = await Service.restoreRegistryByID(id);

			res.status(200).json(request);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static findOneMatriculationOfStudent = async (req, res) => {

		try {

			const search = await Service.getAssociateFunctionByRoleID(req.params);
			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findAllMatriculationOfStudent = async (req, res) => {

		const { student_id } = req.params;

		try {

			const allMatriculationOfStudent = await Service.getAllAssociateFunctionByRoleID(student_id);
			res.status(200).json(allMatriculationOfStudent);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findOneMonitoredClassOfTeacher = async (req, res) => {

		const roleIDs = req.params;
		try {



			const search = await Service.getAssociateFunctionByRoleID(roleIDs);
			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findAllMonitoredClassesByTeacherID = async (req, res) => {

		const { teacher_id } = req.params;

		try {

			const allMonitoredClasses = await Service.getAllAssociateFunctionByRoleID(teacher_id);
			res.status(200).json(allMonitoredClasses);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	/* Matriculation Controller */

	//Review this part 
	static findMatriculationsByClass = async (req, res) => {

		const { class_id } = req.params;

		try {
			const matriculations = await ServiceM.getMatriculationsByClassID(class_id);
			res.status(200).json(matriculations);
		} catch (err) {

			res.status(500).json('no registration found');
		}
	};

	static addStudentMatriculation = async (req, res) => {

		const { student_id } = req.params;
		const newMatriculation = {
			...req.body,
			student_id
		};

		try {

			const search = await ServiceM.addRegistry(newMatriculation);
			res.status(200).json(search);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static updateStudentMatriculation = async (req, res) => {

		const updateData = req.body;
		const { matriculation_id } = req.params;

		try {

			const updatedMatriculation = await ServiceM.updateRegistry(updateData, matriculation_id);

			if (!updatedMatriculation[0]) throw new Error('Não foi dessa vez meu caro, reveja os dados enviados');

			res.status(200).json(
				await ServiceM.getRegistryByID(matriculation_id)
			);
		} catch (err) {
			res.status(500).json(err.message);
		}

	};

	static removeStudentMatriculation = async (req, res) => {

		const { matriculation_id } = req.params;

		try {

			const matriculationDeleted = await ServiceM.deleteRegistryByID(matriculation_id);

			if (!matriculationDeleted) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

			res.status(200).json('Success delete :,)');
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static restaureStudentMatriculation = async (req, res) => {
		const { matriculation_id } = req.params;

		try {
			const matriculationRestaure = await ServiceM.restoreRegistryByID(matriculation_id);

			if (!matriculationRestaure) throw new Error('Não foi dessa vez meu caro..., reveja o ID');
			res.status(200).json(matriculationRestaure);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};
}

module.exports = PeopleController;