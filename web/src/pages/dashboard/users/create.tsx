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
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

import { api } from '../../../services/api';

import { UserRole } from '../../../models/enums';
import {
  CreateUserFormData,
  createUserFormSchema,
} from '../../../validators/CreateUserValidator';
import { useNotification } from '../../../hooks/useNotification';

import { Sidebar, Topbar } from '../../../components';
import { Input, Select } from '../../../components/Form';

export default function CreateUser() {
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
  ) => {
    try {
      await api
        .post('/users', {
          ...values,
        })
        .then(({ data: { user } }) => {
          notification.success({
            title: 'User created successfully',
            to: '/dashboard/users',
          });
        })
        .catch(({ response }) => {
          notification.error(response.data.error);
        });
    } catch (error) {
      notification.error(error.message);
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <Topbar />

      <Flex w="100%" h="100vh" mx="auto">
        <Sidebar />
        <Flex w="100%" my="4" maxW={960} mx="auto">
          <Box
            as="form"
            flex="1"
            borderRadius={8}
            p={['6', '8']}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">
              Create user
            </Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="name"
                  type="text"
                  placeholder="Name"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  name="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                <Select
                  name="role"
                  options={[
                    {
                      label: 'Player',
                      value: UserRole.PLAYER,
                    },
                    {
                      label: 'Moderator',
                      value: UserRole.MODERATOR,
                    },
                    {
                      label: 'Admin',
                      value: UserRole.ADMIN,
                    },
                  ]}
                  error={errors.role}
                  {...register('role')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/dashboard/users" passHref>
                  <Button as="a" colorScheme="red">
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
