import * as Yup from 'yup';
import { getUserBy, updateUser, getUserById } from '../../repositories';
import { ApplicationError } from '../../lib/errors';

module.exports = {
  updateUserById: async (id, params) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(params))) {
        throw new ApplicationError('validation-fails', 400);
      }

      const { email, oldPassword } = params;

      const user = await getUserById(id);

      if (email && email !== user.email) {
        const userExists = await getUserBy({ where: { email: params.email } });
        if (userExists) {
          throw new ApplicationError('email-already-in-use', 409);
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        throw new ApplicationError('password-does-not-match', 401);
      }

      return updateUser(id, params);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
