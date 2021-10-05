import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../contexts/AuthContext';

import {
  SignInFormData,
  signInFormSchema,
} from '../validators/SignInUserValidator';

import {
  Input,
  SignContainer,
  Divider,
  SocialButton,
  TextLink,
} from '../components';

export default function SignIn() {
  const { signIn } = useAuth();

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
    <SignContainer image="game-signin">
      <Flex w="100%" maxW={360} flexDir="column" p="8">
        {/* <SocialButton
          icon={FcGoogle}
          name="Google"
          action="Sign In"
          provider="GOOGLE"
        /> */}
        <SocialButton
          icon={FaGithub}
          name="Github"
          action="Sign In"
          provider="GITHUB"
        />
        <SocialButton
          icon={FaDiscord}
          name="Discord"
          action="Sign In"
          provider="DISCORD"
        />
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
    </SignContainer>
  );
}
