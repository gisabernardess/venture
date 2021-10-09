import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import {
  Flex,
  Box,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  HStack,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import { api } from '../../../services/api';
import { getAPIClient } from '../../../services/axios';

import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks/useNotification';

import { Pagination as PaginationType, User } from '../../../models/types';
import { UserRole } from '../../../models/enums';

import { Pagination, PageContainer } from '../../../components';

interface PermissionsProps {
  users: User[];
  page: PaginationType;
}

export default function Users({ users, page }: PermissionsProps) {
  const notification = useNotification();
  const { user: currentUser } = useAuth();
  const [listOfUsers, setListOfUsers] = useState<User[]>(users);
  const [currentPage, setCurrentPage] = useState(page?.current_page);

  const isAdmin = currentUser?.role === UserRole.ADMIN;

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const refetchUsers = () => {
    api
      .get(`/users?page=${currentPage ?? page?.current_page}`)
      .then(({ data: response }) => setListOfUsers(response.data));
  };

  useEffect(() => {
    refetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  async function handleDelete(userId: number) {
    try {
      await api
        .delete(`/users/${userId}`)
        .then(() => {
          notification.success({
            title: 'User successfully deleted!',
          });
          refetchUsers();
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
            Users
          </Heading>

          <NextLink href="/dashboard/users/create" passHref>
            <Button size="sm" fontSize="md" colorScheme="green">
              <Icon as={FaUserPlus} />
            </Button>
          </NextLink>
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>User</Th>
              {!isMobile && <Th>Role</Th>}
              <Th w="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {listOfUsers?.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Box>
                    <Text>
                      <Text as="span" fontWeight="bold" color="red.500">
                        {user.name.charAt(0)}
                      </Text>
                      {user.name.substr(1, user.name.length)}
                    </Text>
                    {!isMobile && (
                      <Text fontSize="sm" color="gray.400">
                        {user.email}
                      </Text>
                    )}
                  </Box>
                </Td>
                {!isMobile && <Td>{user.role}</Td>}
                <Td>
                  <HStack>
                    <NextLink href={`/dashboard/users/${user.id}`} passHref>
                      <Button
                        size="sm"
                        fontSize="sm"
                        variant="ghost"
                        disabled={!isAdmin}
                      >
                        <Icon as={AiFillEdit} fontSize="20" color="red.500" />
                      </Button>
                    </NextLink>
                    <Button
                      size="sm"
                      fontSize="sm"
                      variant="ghost"
                      disabled={!isAdmin}
                      onClick={() => handleDelete(user.id)}
                    >
                      <Icon as={AiFillDelete} fontSize="20" color="red.500" />
                    </Button>
                  </HStack>
                </Td>
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

  const { data: response } = await apiClient.get('/users?page=1');

  return {
    props: { users: response.data, page: response.meta },
  };
};
