import { Flex, Button, Stack, Icon } from '@chakra-ui/react';
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

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
            Log In
          </Button>
        </Flex>
        <TextLink label="Forgot my password" href="/reset-password" />
      </Flex>
    </Container>
  );
}
