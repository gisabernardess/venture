import { Flex } from '@chakra-ui/react';
import { Sidebar, Topbar } from '../../components';

export default function Profile() {
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
          Profile
        </Flex>
      </Flex>
    </Flex>
  );
}
