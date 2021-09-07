import Link from 'next/link';
import { Text, Flex, HStack, Box, Icon, Stack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Logo } from '../Header/Logo';
import { config } from '../../config';

export function Footer() {
  return (
    <Flex
      as="footer"
      w="100%"
      h="28"
      mx="auto"
      px="6"
      align="center"
      bg="blue.900"
      borderTopWidth="1px"
      borderTopColor="blue.800"
    >
      <Stack
        w="100%"
        maxW={1200}
        h="100%"
        mx="auto"
        align="center"
        justify="center"
        spacing={3}
      >
        <HStack>
          <Logo />
          <Text>© 2021 Gisele Bernardes da Silva</Text>
        </HStack>
        <HStack>
          <Link href={`${config.projectUrl}`} passHref>
            <Icon
              as={FaGithub}
              fontSize="25"
              color="white"
              _hover={{ color: 'red.500' }}
            />
          </Link>

          <Link href={config.linkedInUrl} passHref>
            <Icon
              as={FaLinkedin}
              fontSize="25"
              color="white"
              _hover={{ color: 'red.500' }}
            />
          </Link>
        </HStack>
      </Stack>
    </Flex>
  );
}
