import * as yup from 'yup';

export const updateUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  role: yup.string().required('Role is required'),
  oldPassword: yup.string(),
  password: yup
    .string()
    .when('oldPassword', (password, field) =>
      password ? field.required('Enter your new password') : field,
    ),
  password_confirmation: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required('New password does not match') : field,
    ),
});

export type UpdateUserFormData = {
  name: string;
  email: string;
  role: string;
  oldPassword?: string;
  password?: string;
  password_confirmation?: string;
};
