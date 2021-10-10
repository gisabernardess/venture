import * as yup from 'yup';

export const createCommentFormSchema = yup.object().shape({
  text: yup.string().required('Your comment is required'),
});

export type CreateCommentFormData = {
  text: string;
};
