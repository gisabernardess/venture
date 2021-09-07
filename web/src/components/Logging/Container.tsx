import { Flex, Image, Box } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BackButton } from '..';
import { Logo } from '../Header/Logo';

interface ContainerProps {
  image: string;
  children: ReactElement;
}

export function Container({ image, children }: ContainerProps) {
  return (
    <Flex w="100vw" h="100vh">
      <Flex as="aside" w="680px" alignItems="flex-end">
        <Image src={`images/${image}.png`} alt="Sign In" />
      </Flex>
      <Flex w="100%" h="100%" bg="gray.100" align="center" justify="center">
        <Flex direction="column" align="center">
          <Box mb="10">
            <Logo dark />
          </Box>
          {children}
          <BackButton />
        </Flex>
      </Flex>
    </Flex>
  );
}
