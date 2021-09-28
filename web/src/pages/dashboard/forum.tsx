import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Flex } from '@chakra-ui/react';
import { Topbar, Sidebar } from '../../components';

export default function Forum() {
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
          Forum
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

  return {
    props: {},
  };
};
