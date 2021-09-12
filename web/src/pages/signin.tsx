import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Input,
  Container,
  Divider,
  GoogleButton,
  TextLink,
} from '../components';

import { User } from '../models/types';

type SignInFormData = Pick<User, 'email' | 'password'>;

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(8),
});

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  };

  return (
    <Container image="game-signin">
      <Flex w="100%" maxW={360} flexDir="column" p="8">
        <GoogleButton label="Sign In" />
        <Divider />
        <Flex
          as="form"
          w="100%"
          maxW={360}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              placeholder="email@domain.com"
              error={errors.email}
              {...register('email')}
            />
            <Input
              name="password"
              type="password"
              placeholder="**********"
              error={errors.password}
              {...register('password')}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="red"
            size="lg"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </Flex>
        <TextLink label="Forgot my password" href="/reset-password" />
        <TextLink label="Create a new account" href="/signup" />
      </Flex>
    </Container>
  );
}
