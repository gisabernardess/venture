import { useRouter } from 'next/router';
import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface BackButtonProps {
  href?: string;
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      leftIcon={<Icon as={AiOutlineArrowLeft} fontSize="20px" />}
      variant="unstyled"
      color="gray.500"
      display="flex"
      mt="10"
      _hover={{ color: 'gray.600' }}
      onClick={() => (href ? router.push(href) : router.back())}
    >
      back
    </Button>
  );
}
