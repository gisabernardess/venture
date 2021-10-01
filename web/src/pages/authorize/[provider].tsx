import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import { SocialAuthParams, useAuth } from '../../contexts/AuthContext';

export default function Authorize({ provider }) {
  const { socialAuthCallback } = useAuth();

  const router = useRouter();
  const params = router.query as SocialAuthParams;

  useEffect(() => {
    if (provider && params.code) {
      socialAuthCallback({
        provider: provider.toUpperCase(),
        code: params.code,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      Authorizing...
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;

  return {
    props: { provider: params.provider },
  };
};
