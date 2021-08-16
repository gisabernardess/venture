import { Flex } from '@chakra-ui/react';
import { Header, Sidebar } from '../components';

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" h="100vh" maxW={1480} mx="auto">
        <Sidebar />
        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6"></Flex>
      </Flex>
    </Flex>
  );
}
