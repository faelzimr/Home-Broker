import usersServices from '../../services/user';

class UserController {
  async store(req, res) {
    try {
      const { id, name, email, enterprise } = await usersServices.storeUser(
        req.body
      );
      return res.json({
        id,
        name,
        email,
        enterprise,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const id = req.userId;
    const params = req.body;

    try {
      const { name, email, enterprise } = await usersServices.updateUserById(
        id,
        params
      );
      res.json({ id, name, email, enterprise });
    } catch (error) {
      res.status(error.status || 500).json({
        name: error.name,
        message: error.message,
      });
    }
  }
}
export default new UserController();
