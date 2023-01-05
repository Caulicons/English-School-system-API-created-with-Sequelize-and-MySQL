const db = require('../models');
const LevelsService = require('../services/LevelsService');

const Service = new LevelsService();
class LevelController {

	static findAllLevels = async (req, res) => {
    
		const query = req.query;
		try {

			if (!query) {
				const levels = await Service.getAllRegistry();
				return res.status(200).json(levels);
			}

			const levels = await Service.getAllRegistry(query);

			if (!levels[0]) throw new Error('Não foi possível encontra o que solicitou, reveja as query...');

			res.status(200).json(levels);
		} catch (err) {

			res.status(500).json(err.message);
		}
	};

	static findLevel = async (req, res) => {

		const { id } = req.params;

		try {
			const level = await Service.getRegistryByID(id)

			if(!level) throw new Error(level);

			res.status(200).json(level);
		} catch (err) {

			res.status(500).json('Não foi possível encontra a matricula que solicitou, reveja as query...');
		}
	};

	static updateLevel = async (req, res) => {

		const updateData = req.body;
		const { id } = req.params;

		try {

			const updateLevel = await Service.updateRegistry(updateData, id)

			if ( updateLevel == false) throw new Error('Not found Level with this ID');
			res.status(200).json( 
				await Service.getRegistryByID(id)
			);
		} catch (err) {
			
			res.status(500).json(err.message);
		}

	};

	static addLevel = async (req, res) => {

		const newLevel = req.body;
		try {

			const levelCreated = await Service.addRegistry(newLevel);

			res.status(200).json(levelCreated);
		} catch (err) {
			res.status(500).json(err.message);
		}
	};

	static removeLevelById = async (req, res) => {

		const { id } = req.params;
		try {
			const search = await db.Levels.destroy({
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

	static restoreLevel = async (req, res) => {
		const { id } = req.params;

		try {
			const levelRestore = await Service.restoreRegistryByID(id)

			if (!levelRestore) throw new Error('Não foi dessa vez meu caro..., reveja o ID');
			res.status(200).json(' Restaure level with successes!');
		} catch (err) {
			res.status(500).json(err.message);
		}
	};
}
module.exports = LevelController;