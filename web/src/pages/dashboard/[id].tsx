import { GetServerSideProps } from 'next';
import { useAuth } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';
import { Flex } from '@chakra-ui/react';
import { Topbar, Sidebar } from '../../components';
import { useRedirect } from '../../hooks/useRedirect';

export default function Dashboard({ id }) {
  const { redirectTo } = useRedirect();
  const { user, isAuthenticated } = useAuth();

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['venture.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const { params } = ctx;

  return {
    props: { id: params.id },
  };
};
