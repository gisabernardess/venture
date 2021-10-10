import { useForm } from 'react-hook-form';
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

import { useAuth } from '../../contexts/AuthContext';

import { Comment } from '../../models/types';

import { Textarea, Avatar } from '../../components';

interface CommentsProps {
  comments: Comment[];
}

export function Comments({ comments }: CommentsProps) {
  const { user: currentUser } = useAuth();
  const hasComments = comments?.length > 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCreate = async () => {};

  const handleDelete = async (commentId: number) => {};

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
            name="comment"
            placeholder="Your comment..."
            height="5rem"
            error={errors.comment}
            {...register('comment')}
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
