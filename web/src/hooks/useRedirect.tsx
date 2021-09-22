import { useRouter } from 'next/router';

export const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (url: string) => router.push(url);

  return {
    redirectTo,
  };
};
