import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '../contexts/AuthContext';

import {
  SignUpFormData,
  signUpFormSchema,
} from '../validators/SignUpUserValidator';

import {
  Input,
  SignContainer,
  Divider,
  SocialButton,
  TextLink,
} from '../components';

export default function SignUp() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      await signUp(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignContainer image="game-signup">
      <Flex w="100%" maxW={360} flexDir="column" p="8">
        {/* <SocialButton
          icon={FcGoogle}
          name="Google"
          action="Sign Up"
          provider="GOOGLE"
        /> */}
        <SocialButton
          icon={FaGithub}
          name="Github"
          action="Sign Up"
          provider="GITHUB"
        />
        <SocialButton
          icon={FaDiscord}
          name="Discord"
          action="Sign Up"
          provider="DISCORD"
        />
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
            <Input
              name="password_confirmation"
              type="password"
              placeholder="**********"
              error={errors.password_confirmation}
              {...register('password_confirmation')}
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
    </SignContainer>
  );
}
