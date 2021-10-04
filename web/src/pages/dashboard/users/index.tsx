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

import { useNotification } from '../../../hooks/useNotification';

import { User } from '../../../models/types';

import { Pagination, PageContainer } from '../../../components';

interface PermissionsProps {
  users: User[];
  totalCount: number;
}

export default function Users({ users, totalCount }: PermissionsProps) {
  const notification = useNotification();
  const [listOfUsers, setListOfUsers] = useState<User[]>(users);
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  async function refetchUsers() {
    const response = await api.get('/users');
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
                          <Button size="sm" fontSize="sm" variant="ghost">
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
              totalCountOfRegisters={totalCount}
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

  const { data } = await apiClient.get('/users');

  return {
    props: { users: data, totalCount: data.length },
  };
};
