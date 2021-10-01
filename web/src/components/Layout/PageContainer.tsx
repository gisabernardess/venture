import React, { ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import { Topbar, Sidebar } from '../../components';

interface PageContainerProps {
  children: ReactElement;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Flex direction="column" h="100vh">
      <Topbar />

      <Flex w="100%" h="100vh" mx="auto">
        <Sidebar />
        <Flex
          w="100%"
          my="4"
          maxW={960}
          mx="auto"
          px="6"
          border="1px solid yellow"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
