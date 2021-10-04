import * as yup from 'yup';
import { User } from '../models/types';

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(8),
});

export type SignInFormData = Pick<User, 'email' | 'password'>;
