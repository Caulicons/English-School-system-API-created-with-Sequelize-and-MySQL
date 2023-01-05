const ClassesService = require('../services/ClassesService');
const { Op } = require('sequelize');
const Service = new ClassesService();

class ClassController {

	static findAllClasses = async (req, res) => {

		const { start_date, end_date } = req.query;
		const where = {};
		start_date || end_date ? where.start_date = {} : null;
		start_date ? where.start_date[Op.gte] = start_date : null;
		end_date ? where.start_date[Op.lte] = end_date : null;

		try {
			const classes = await Service.getAllRegistry(where);

			if (!classes) throw new Error('Não foi possível encontra a Classe que solicitou, reveja as query...');

			res.status(200).json(classes);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findClass = async (req, res) => {

		const { id } = req.params;

		try {
			const classes = await Service.getRegistryByID(id);

			if (!classes) throw new Error(classes);

			res.status(200).json(classes);
		} catch (err) {

			res.status(500).json('Não foi possível encontra a classe que solicitou, reveja as query...');
		}
	};

	static findClassCrowded = async (req, res) => {

		try {

			const matriculations = await Service.getClassCrowded();
			res.status(200).json(matriculations.count);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static findAllClassMatriculations = async (req, res) => {
		const { class_id } = req.params;
		try {

			const matriculations = await Service.getAllClassMatriculations(class_id);
			res.status(200).json(matriculations);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static updateClass = async (req, res) => {

		const updateDate = req.body;
		const { id } = req.params;

		try {

			const updateClass = await Service.updateRegistry(updateDate, id);
			if (updateClass == false) throw new Error('Not found matriculations with this ID');

			res.status(200).json('Enrollment successfully edited!');
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static addClass = async (req, res) => {

		const newClass = req.body;
		try {

			const classAdd = await Service.addRegistry(newClass);

			res.status(200).json(classAdd);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removeClassById = async (req, res) => {

		const { id } = req.params;
		try {
			const classe = await Service.deleteRegistryByID(id);

			if (!classe) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

			res.status(200).json('Success delete :,)');
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static restoreClass = async (req, res) => {
		const { id } = req.params;

		try {
			const classe = await Service.restoreRegistryByID(id);
			if (!classe) throw new Error('Não foi dessa vez meu caro..., reveja o ID');
			res.status(200).json(classe);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};
}

module.exports = ClassController;