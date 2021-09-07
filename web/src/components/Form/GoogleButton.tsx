import { Button, Icon } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleButtonProps {
  label: string;
}

export function GoogleButton({ label }: GoogleButtonProps) {
  return (
    <Button
      color="gray.600"
      variant="outline"
      leftIcon={<Icon as={FcGoogle} fontSize="25" />}
    >
      {`${label} with Google`}
    </Button>
  );
}
