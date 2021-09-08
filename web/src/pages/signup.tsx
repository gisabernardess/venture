import { useRouter } from 'next/router';
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
import { isEmpty } from '../utils';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    if (isEmpty(errors)) {
      router.push(`/dashboard/2`);
    }
  };

  return (
    <Container image="game-signup">
      <Flex w="100%" maxW={360} flexDir="column" p="8">
        <GoogleButton label="Sign Up" />
        <Divider />
        <Flex
          as="form"
          w="100%"
          maxW={360}
          flexDir="column"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Stack spacing="4">
            <Input
              name="name"
              type="text"
              placeholder="Jane Doe"
              error={errors.name}
              {...register('name')}
            />
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
            Sign Up
          </Button>
        </Flex>
        <TextLink label="Already have an account?" href="/signin" />
      </Flex>
    </Container>
  );
}
