import * as yup from 'yup';

export const createPostFormSchema = yup.object().shape({
  slug: yup.string().required('Slug is required'),
  title: yup.string().required('Title is required'),
  excerpt: yup.string().notRequired(),
  content: yup.string().required('Content is required'),
});

export type CreatePostFormData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};
