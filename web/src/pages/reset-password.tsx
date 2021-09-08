import { Flex, Button, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input, Container } from '../components';

type ResetPasswordFormData = {
  email: string;
};

const resetPasswordFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
});

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const handleResetPassword: SubmitHandler<ResetPasswordFormData> = async (
    values,
  ) => {
    alert('Email sent');
  };

  return (
    <Container image="game-forgotpass">
      <Flex w="100%" maxW={360} flexDir="column" p="8">
        <Text
          as="span"
          fontSize="sm"
          color="blue.700"
          mb="10"
          textAlign="center"
        >
          Your password reset will be sent to the registered email.
        </Text>
        <Flex
          as="form"
          w="100%"
          maxW={360}
          flexDir="column"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              placeholder="email@domain.com"
              error={errors.email}
              {...register('email')}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="red"
            size="lg"
            isLoading={isSubmitting}
          >
            Reset Password
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
