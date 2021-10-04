import * as yup from 'yup';

export const resetPasswordFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
});

export type ResetPasswordFormData = {
  email: string;
};
