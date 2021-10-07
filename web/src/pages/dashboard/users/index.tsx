import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useState } from 'react';
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
  Spinner,
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

  console.log(page);

  const isAdmin = currentUser?.role === UserRole.ADMIN;

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  async function refetchUsers() {
    const response = await api.get(`/users?page=${page?.current_page ?? 1}`);
    setListOfUsers(response.data);
  }

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
        .catch(({ response }) => notification.error(response.data.error));
    } catch (error) {
      notification.error(error.message);
    }
  }

  const isLoading = false;
  const isFetching = false;
  const error = undefined;

  return (
    <PageContainer>
      <Box flex="1" py="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Users
            {!isLoading && isFetching && (
              <Spinner size="sm" color="gray.500" ml="4" />
            )}
          </Heading>

          <NextLink href="/dashboard/users/create" passHref>
            <Button size="sm" fontSize="md" colorScheme="green">
              <Icon as={FaUserPlus} />
            </Button>
          </NextLink>
        </Flex>

        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify="center">
            <Text>Unable to fetch the data.</Text>
          </Flex>
        ) : (
          <>
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
                            <Icon
                              as={AiFillEdit}
                              fontSize="20"
                              color="red.500"
                            />
                          </Button>
                        </NextLink>
                        <Button
                          size="sm"
                          fontSize="sm"
                          variant="ghost"
                          disabled={!isAdmin}
                          onClick={() => handleDelete(user.id)}
                        >
                          <Icon
                            as={AiFillDelete}
                            fontSize="20"
                            color="red.500"
                          />
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
          </>
        )}
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
