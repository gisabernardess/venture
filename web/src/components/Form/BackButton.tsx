import { useRouter } from 'next/router';
import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface BackButtonProps {
  href?: string;
  color?: string;
  mt?: string;
  hover?: {
    color: string;
  };
}

export function BackButton({ href, color, hover, ...rest }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      leftIcon={<Icon as={AiOutlineArrowLeft} fontSize="20px" />}
      variant="unstyled"
      color={color ?? 'gray.500'}
      display="flex"
      _hover={hover ?? { color: 'gray.600' }}
      onClick={() => (href ? router.push(href) : router.back())}
      {...rest}
    >
      back
    </Button>
  );
}
