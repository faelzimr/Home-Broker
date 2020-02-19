import User from '../models/User';
import File from '../models/File';

class EntrepriseController {
  async index(req, res) {
    const enterprises = await User.findAll({
      where: { enterprise: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(enterprises);
  }
}

export default new EntrepriseController();
