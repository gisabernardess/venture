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

import { useNotification } from '../../../hooks/useNotification';

import { UserRole } from '../../../models/enums';
import {
  CreateUserFormData,
  createUserFormSchema,
} from '../../../validators/CreateUserValidator';

import { Input, Select, PageContainer } from '../../../components';

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
        .then(() => {
          notification.success({
            title: 'User created successfully',
            to: '/dashboard/users',
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
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Heading size="lg" fontWeight="normal">
          Create user
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid w="100%">
            <Heading size="md" fontWeight="normal">
              Personal Information
            </Heading>
          </SimpleGrid>

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

            <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
              Save
            </Button>
          </HStack>
        </Flex>
      </Box>
    </PageContainer>
  );
}
