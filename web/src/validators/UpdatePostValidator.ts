import * as yup from 'yup';

export const updatePostFormSchema = yup.object().shape({
  slug: yup.string(),
  title: yup.string().required('Title is required'),
  excerpt: yup.string().notRequired(),
  content: yup.string().required('Content is required'),
});

export type UpdatePostFormData = {
  slug?: string;
  title: string;
  excerpt?: string;
  content: string;
};
