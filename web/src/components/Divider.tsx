import { Divider as ChakraDivider, Text, HStack } from '@chakra-ui/react';

export function Divider() {
  return (
    <HStack my="5">
      <ChakraDivider orientation="horizontal" />
      <Text color="gray.500">or</Text>
      <ChakraDivider orientation="horizontal" />
    </HStack>
  );
}
