import Link from 'next/link';
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

import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks/useNotification';

import {
  updatePostFormSchema,
  UpdatePostFormData,
} from '../../../validators/UpdatePostValidator';

import { Input, Textarea, PageContainer } from '../../../components';

export default function UpdatePost() {
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
        .post('/posts', {
          userId: currentUser.id,
          ...values,
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
          Create guide
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <Input
            name="slug"
            type="text"
            placeholder="Slug"
            error={errors.slug}
            {...register('slug')}
            isDisabled
          />

          <Input
            name="title"
            type="title"
            placeholder="Title"
            error={errors.title}
            {...register('title')}
          />

          <Input
            name="excerpt"
            type="excerpt"
            placeholder="Briefing"
            error={errors.excerpt}
            {...register('excerpt')}
          />

          {/* TODO: RichText Editor */}
          <Textarea
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
