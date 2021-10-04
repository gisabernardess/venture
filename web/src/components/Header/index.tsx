import NextLink from 'next/link';
import { Button, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import { Logo } from './Logo';

export function Header() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

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
        <Logo />
        <Flex ml="auto" justify="space-between">
          <HStack>
            <NextLink href="/signin" passHref>
              <Button as="a" size="md" fontSize="sm" colorScheme="blue">
                Sign In
              </Button>
            </NextLink>
            {!isMobile && (
              <NextLink href="/signup" passHref>
                <Button as="a" size="md" fontSize="sm" colorScheme="red">
                  Sign Up
                </Button>
              </NextLink>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
