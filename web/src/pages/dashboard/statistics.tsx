import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Text } from '@chakra-ui/react';

import { PageContainer } from '../../components';

export default function Statistics() {
  return (
    <PageContainer>
      <Text>Statistics</Text>
    </PageContainer>
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
