import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import {
  Box,
  Container,
  Heading,
  Text,
  Icon,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';

import { api } from '../../../../services/api';
import { getAPIClient } from '../../../../services/axios';

import { Post } from '../../../../models/types';

import { BackButton, PageContainer } from '../../../../components';
import { toFormatDate } from '../../../../utils';
import { Comments } from '../../../../components/Comments';

interface ViewPostProps {
  post: Post;
}

export default function ViewPost({ post: received }: ViewPostProps) {
  const [post, setPost] = useState<Post>(received);

  const refetchPost = () => {
    api.get(`/posts/${post.slug}`).then(({ data }) => setPost(data));
  };

  return (
    <PageContainer>
      <Box flex="1" py="8">
        <Flex justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            {post.title}
          </Heading>
          <BackButton
            href="/dashboard/posts"
            color="gray.50"
            hover={{ color: 'gray.400' }}
          />
        </Flex>
        <Text mb="4" fontSize="xs" display="flex" alignItems="center">
          <Icon as={AiOutlineClockCircle} mr="1" />
          {toFormatDate(post.updatedAt)}
          <Icon as={AiOutlineUser} ml="2" mr="1" />
          {post.user.name}
        </Text>
        <Container
          dangerouslySetInnerHTML={{ __html: post.content }}
          maxW="container.xl"
        />

        <Divider my="6" borderColor="gray.700" />

        <Comments
          postId={post.id}
          comments={post.comments}
          refetch={refetchPost}
        />
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
