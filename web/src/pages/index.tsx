import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" h="100vh" mx="auto">
        <Flex
          w="100%"
          maxW={1200}
          mx="auto"
          px="6"
          border="1px solid yellow"
        ></Flex>
      </Flex>
    </Flex>
  );
}
