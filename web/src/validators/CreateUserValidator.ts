import * as yup from 'yup';

export const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  role: yup.string().required('Role is required'),
  password: yup.string(),
  password_confirmation: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required('Password does not match') : field,
    ),
});

export type CreateUserFormData = {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
};
