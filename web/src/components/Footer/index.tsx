import { Text, Flex, HStack, Stack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Logo } from '../Header/Logo';
import { IconButton } from '../Form';

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
        <Stack direction={['column', 'row']} alignItems={['center']}>
          <Logo />
          <Text>© 2021 Gisele Bernardes da Silva</Text>
        </Stack>
        <HStack>
          <IconButton
            variant="link"
            icon={{ icon: FaGithub }}
            href={config.projectUrl}
          />
          <IconButton
            variant="link"
            icon={{ icon: FaLinkedin }}
            href={config.linkedInUrl}
          />
        </HStack>
      </Stack>
    </Flex>
  );
}
