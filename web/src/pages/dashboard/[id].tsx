import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Flex } from '@chakra-ui/react';
import { Topbar, Sidebar } from '../../components';
import { useRedirect } from '../../hooks/useRedirect';

export default function Dashboard({ id }) {
  const { redirectTo } = useRedirect();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo('/');
    }
  }, [isAuthenticated]);

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
