import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';

import { api } from '../../../services/api';
import { getAPIClient } from '../../../services/axios';

import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks/useNotification';

import { Post } from '../../../models/types';
import {
  updatePostFormSchema,
  UpdatePostFormData,
} from '../../../validators/UpdatePostValidator';

import { Input, Textarea, PageContainer } from '../../../components';

interface UpdatePostProps {
  post: Post;
}

export default function UpdatePost({ post }: UpdatePostProps) {
  const { user: currentUser } = useAuth();
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updatePostFormSchema),
  });

  const handleUpdatePost: SubmitHandler<UpdatePostFormData> = async (
    values,
  ) => {
    try {
      await api
        .put(`/posts/${post.slug}`, {
          ...values,
          userId: currentUser.id,
          slug: post.slug,
        })
        .then(() => {
          notification.success({
            title: 'Post updated successfully',
            to: '/dashboard/posts',
          });
        })
        .catch(({ response }) => {
          notification.error({ message: response.data.message });
        });
    } catch (error) {
      notification.error(error.message);
    }
  };

  return (
    <PageContainer>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        p={['6', '8']}
        onSubmit={handleSubmit(handleUpdatePost)}
      >
        <Heading size="lg" fontWeight="normal">
          Update guide
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <Input
            defaultValue={post?.slug}
            name="slug"
            type="text"
            placeholder="Slug"
            error={errors.slug}
            {...register('slug')}
            isDisabled
          />

          <Input
            defaultValue={post?.title}
            name="title"
            type="title"
            placeholder="Title"
            error={errors.title}
            {...register('title')}
          />

          <Input
            defaultValue={post?.excerpt}
            name="excerpt"
            type="excerpt"
            placeholder="Briefing"
            error={errors.excerpt}
            {...register('excerpt')}
          />

          {/* TODO: RichText Editor */}
          <Textarea
            defaultValue={post?.content}
            name="content"
            placeholder="Content"
            error={errors.content}
            {...register('content')}
          />
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/dashboard/posts" passHref>
              <Button as="a" colorScheme="red">
                Cancel
              </Button>
            </Link>

            <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
              Save
            </Button>
          </HStack>
        </Flex>
      </Box>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);

  const { ['venture.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const { params } = ctx;
  const { data } = await apiClient.get(`/posts/${params.slug}`);

  return {
    props: { post: data },
  };
};
