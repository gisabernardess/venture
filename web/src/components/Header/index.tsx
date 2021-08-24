import NextLink from 'next/link';
import { Button, Flex, Image } from '@chakra-ui/react';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      mx="auto"
      px="6"
      align="center"
      bg="blue.900"
      borderBottomWidth="1px"
      borderBottomColor="blue.800"
    >
      <Flex w="100%" maxW={1200} h="100%" mx="auto" align="center">
        <Image src="images/logo.svg" alt="Venture" />
        <Flex w="15%" ml="auto" justify="space-between">
          <NextLink href="/signin" passHref>
            <Button as="a" size="md" fontSize="sm" colorScheme="blue">
              Sign In
            </Button>
          </NextLink>
          <NextLink href="/signup" passHref>
            <Button as="a" size="md" fontSize="sm" colorScheme="red">
              Sign Up
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
}
