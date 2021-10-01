import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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
import { getAPIClient } from '../../../services/axios';

import { useNotification } from '../../../hooks/useNotification';

import { User } from '../../../models/types';
import { UserRole } from '../../../models/enums';
import {
  UpdateUserFormData,
  updateUserFormSchema,
} from '../../../validators/UpdateUserValidator';

import { Input, Select, PageContainer } from '../../../components';

interface UpdateUserProps {
  user: User;
}

export default function UpdateUser({ user }: UpdateUserProps) {
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateUserFormSchema),
  });

  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (
    values,
  ) => {
    try {
      await api
        .put(`/users/${user.id}`, {
          id: user.id,
          ...values,
        })
        .then(() => {
          notification.success({
            title: 'User updated successfully',
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
    <PageContainer>
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        p={['6', '8']}
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <Heading size="lg" fontWeight="normal">
          Update user
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
              defaultValue={user?.name}
              name="name"
              type="text"
              placeholder="Name"
              error={errors.name}
              {...register('name')}
            />
            <Input
              defaultValue={user?.email}
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              {...register('email')}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Select
              defaultValue={user?.role}
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

          <SimpleGrid w="100%">
            <Heading size="md" fontWeight="normal">
              Account Security
            </Heading>
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
            <Input
              name="oldPassword"
              type="password"
              placeholder="Current Password"
              error={errors.oldPassword}
              {...register('oldPassword')}
            />
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
  const { data } = await apiClient.get(`/users/${params.id}`);

  return {
    props: { user: data },
  };
};
