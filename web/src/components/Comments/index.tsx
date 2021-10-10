import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Heading,
  Text,
  Icon,
  Flex,
  Divider,
  VStack,
  StackDivider,
  Center,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';

import { api } from '../../services/api';

import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';

import { Comment } from '../../models/types';
import {
  CreateCommentFormData,
  createCommentFormSchema,
} from '../../validators/CreateCommentValidator';

import { Textarea, Avatar } from '../../components';

interface CommentsProps {
  postId: number;
  comments: Comment[];
  refetch: () => void;
}

export function Comments({ postId, comments, refetch }: CommentsProps) {
  const notification = useNotification();
  const { user: currentUser } = useAuth();
  const hasComments = comments?.length > 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createCommentFormSchema),
  });

  const handleCreate: SubmitHandler<CreateCommentFormData> = async (
    values,
    e,
  ) => {
    try {
      await api
        .post('/comments', {
          postId: postId,
          userId: currentUser.id,
          ...values,
        })
        .then(() => {
          refetch();
          e.target.reset();
          notification.success({
            title: 'Comment created successfully',
          });
        })
        .catch(({ response }) => {
          notification.error({ message: response.data.message });
        });
    } catch (error) {
      notification.error(error.message);
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      await api
        .delete(`/comments/${commentId}`)
        .then(() => {
          refetch();
          notification.success({
            title: 'Comment successfully deleted!',
          });
        })
        .catch(({ response }) =>
          notification.error({ message: response.data.message }),
        );
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <>
      <Heading size="lg" fontWeight="normal">
        Comments
      </Heading>

      <Box py={['6', '8']}>
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          pb={['6', '8']}
          onSubmit={handleSubmit(handleCreate)}
        >
          {/* TODO: RichText Editor */}
          <Textarea
            name="text"
            placeholder="Your comment..."
            height="5rem"
            error={errors.text}
            {...register('text')}
          />

          <Flex mt="8" justify="flex-end">
            <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
              Save
            </Button>
          </Flex>
        </Box>

        {!hasComments && (
          <Flex w="100%" align="center" justify="center" pb={['6', '8']}>
            <Text as="span" fontSize="sm">
              No comments. Be the first one!
            </Text>
          </Flex>
        )}

        {hasComments && (
          <VStack
            divider={<StackDivider borderColor="blue.700" />}
            spacing={4}
            align="stretch"
            pb={['6', '8']}
          >
            {comments.map((comment) => {
              return (
                <Flex key={comment.id} align="center" justify="space-between">
                  <Flex align="center">
                    <Avatar size="sm" user={comment.author} />
                    <Center mx="4" height="1.25rem">
                      <Divider orientation="vertical" />
                    </Center>
                    <Box textAlign="justify">
                      <Text>{comment.text}</Text>
                    </Box>
                  </Flex>
                  {currentUser?.id === comment.author.id && (
                    <Button
                      size="sm"
                      fontSize="sm"
                      variant="ghost"
                      ml="4"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Icon as={AiFillDelete} fontSize="20" color="red.500" />
                    </Button>
                  )}
                </Flex>
              );
            })}
          </VStack>
        )}
      </Box>
    </>
  );
}
