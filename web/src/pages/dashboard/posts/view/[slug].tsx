import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Icon,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';

import { getAPIClient } from '../../../../services/axios';

import { Post } from '../../../../models/types';

import { BackButton, PageContainer, Textarea } from '../../../../components';
import { toFormatDate } from '../../../../utils';
import { Comments } from '../../../../components/Comments';

interface ViewPostProps {
  post: Omit<Post, 'slug' | 'excerpt'>;
}

export default function ViewPost({ post }: ViewPostProps) {
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

        <Comments comments={post.comments} />
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
