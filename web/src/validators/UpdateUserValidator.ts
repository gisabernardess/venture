import * as yup from 'yup';

export const updateUserFormSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  role: yup.string(),
  oldPassword: yup.string(),
  password: yup
    .string()
    .when('oldPassword', (password, field) =>
      password
        ? field
            .required('Enter your new password')
            .min(8, 'Your new password must be at least 8 characters')
        : field,
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
