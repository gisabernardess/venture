import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Flex } from '@chakra-ui/react';
import { Topbar, Sidebar } from '../../components';

export default function Dashboard({ id }) {
  const { user } = useContext(AuthContext);
  console.log(user);
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
          {`Dashboard ${id}`}
        </Flex>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
