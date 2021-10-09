import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import {
  Box,
  Heading,
  Button,
  Icon,
  Flex,
  useBreakpointValue,
  Table,
  Tr,
  HStack,
  Tbody,
  Td,
  Text,
  Link,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClockCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { format } from 'date-fns';

import { api } from '../../../services/api';
import { getAPIClient } from '../../../services/axios';

import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks/useNotification';

import { Pagination as PaginationType, Post } from '../../../models/types';
import { UserRole } from '../../../models/enums';

import { Pagination, PageContainer } from '../../../components';

const formatPostResponse = (posts: any) =>
  posts.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      createdBy: post.user.name,
      updatedAt: format(new Date(post.updated_at), 'PPP'),
    };
  });

interface PostsProps {
  posts: Post[];
  page: PaginationType;
}

export default function Posts({ posts, page }: PostsProps) {
  const notification = useNotification();
  const { user: currentUser } = useAuth();
  const [listOfPosts, setListOfPosts] = useState<Post[]>(posts);
  const [currentPage, setCurrentPage] = useState(page?.current_page);

  const isPlayer = currentUser?.role === UserRole.PLAYER;

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const refetchPosts = () => {
    api
      .get(`/posts?page=${currentPage ?? page?.current_page}`)
      .then(({ data: response }) => {
        const posts = formatPostResponse(response.data);
        setListOfPosts(posts);
      });
  };

  useEffect(() => {
    refetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  async function handleDelete(slug: string) {
    try {
      await api
        .delete(`/posts/${slug}`)
        .then(() => {
          notification.success({
            title: 'Post successfully deleted!',
          });
          refetchPosts();
        })
        .catch(({ response }) =>
          notification.error({ message: response.data.message }),
        );
    } catch (error) {
      notification.error({ message: error.message });
    }
  }

  return (
    <PageContainer>
      <Box flex="1" py="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Guides
          </Heading>
          {!isPlayer && (
            <NextLink href="/dashboard/posts/create" passHref>
              <Button size="sm" fontSize="md" colorScheme="green">
                <Icon as={FaPlus} />
              </Button>
            </NextLink>
          )}
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Tbody>
            {listOfPosts?.map((post) => (
              <Tr key={post.slug}>
                <Td>
                  <Box>
                    <NextLink href={`/dashboard/posts/${post.slug}`} passHref>
                      <Link>
                        <Text>
                          <Text as="span" fontWeight="bold" color="red.500">
                            {post.title.charAt(0)}
                          </Text>
                          {post.title.substr(1, post.title.length)}
                        </Text>
                      </Link>
                    </NextLink>
                    <Text fontSize="xs" display="flex" alignItems="center">
                      <Icon as={AiOutlineClockCircle} mr="1" />
                      {post.updatedAt}
                      <Icon as={AiOutlineUser} ml="2" mr="1" />
                      {post.createdBy}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {post.excerpt}
                    </Text>
                  </Box>
                </Td>
                {!isPlayer && (
                  <Td>
                    <HStack>
                      <NextLink href={`/dashboard/posts/${post.slug}`} passHref>
                        <Button
                          size="sm"
                          fontSize="sm"
                          variant="ghost"
                          disabled={isPlayer}
                        >
                          <Icon as={AiFillEdit} fontSize="20" color="red.500" />
                        </Button>
                      </NextLink>
                      <Button
                        size="sm"
                        fontSize="sm"
                        variant="ghost"
                        disabled={isPlayer}
                        onClick={() => handleDelete(post.slug)}
                      >
                        <Icon as={AiFillDelete} fontSize="20" color="red.500" />
                      </Button>
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Pagination
          totalCountOfRegisters={page?.total}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
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

  const { data: response } = await apiClient.get('/posts?page=1');

  const posts = formatPostResponse(response.data);

  return {
    props: { posts: posts, page: response.meta },
  };
};
