import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(8),
  password_confirmation: yup
    .string()
    .min(8)
    .when('password', (password, field) =>
      password ? field.required('Passwords do not match') : field,
    ),
});

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
