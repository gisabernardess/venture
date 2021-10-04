import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { Text } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

import { PageContainer } from '../../components';

export default function Dashboard({ id }) {
  const { user } = useAuth();

  return (
    <PageContainer>
      <Text>{`Welcome ${user?.name}, ID ${id}`}</Text>
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

  const { params } = ctx;

  return {
    props: { id: params.id },
  };
};
