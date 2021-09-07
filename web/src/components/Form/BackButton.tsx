import NextLink from 'next/link';
import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface BackButtonProps {
  href?: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <NextLink href={href ?? '/'} passHref>
      <Button
        leftIcon={<Icon as={AiOutlineArrowLeft} fontSize="20px" />}
        variant="unstyled"
        color="gray.500"
        display="flex"
        mt="10"
        _hover={{ color: 'gray.600' }}
      >
        back
      </Button>
    </NextLink>
  );
}
