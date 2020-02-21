import * as Yup from 'yup';
import { getUserBy, createUser } from '../../repositories';
import { ApplicationError } from '../../lib/errors';

module.exports = {
  storeUser: async params => {
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
      const user = await getUserBy({ where: { email: params.email } });
      if (user) {
        throw new ApplicationError('email-already-in-use', 409);
      }
      return createUser(params);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
