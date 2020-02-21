import User from '../app/models/User';

module.exports = {
  getUserBy: async param => {
    try {
      return await User.findOne(param);
    } catch (error) {
      throw error;
    }
  },

  createUser: async params => {
    try {
      return await User.create(params);
    } catch (error) {
      throw error;
    }
  },

  getUserById: async id => {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, params) => {
    try {
      const user = await User.findByPk(id);
      return await user.update(params);
    } catch (error) {
      throw error;
    }
  },
};
