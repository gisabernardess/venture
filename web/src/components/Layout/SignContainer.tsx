import React, { ReactElement } from 'react';
import { Flex, Image, Box, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from '../Header/Logo';
import { BackButton } from '..';

interface SignContainerProps {
  image: string;
  children: ReactElement;
}

export function SignContainer({ image, children }: SignContainerProps) {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  return (
    <Flex w="100vw" h="100vh">
      {!isMobile && (
        <Flex as="aside" w="680px" alignItems="flex-end">
          <Image src={`images/${image}.png`} alt={`${image}`} />
        </Flex>
      )}
      <Flex w="100%" h="100%" bg="gray.100" align="center" justify="center">
        <Flex direction="column" align="center">
          <Box mb="10">
            <Logo dark />
          </Box>
          {children}
          <BackButton mt="10" />
        </Flex>
      </Flex>
    </Flex>
  );
}
