import { Image } from '@chakra-ui/react';

interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark = false }: LogoProps) {
  return (
    <>
      {dark ? (
        <Image src="images/logo-black.svg" alt="Venture" />
      ) : (
        <Image src="images/logo.svg" alt="Venture" />
      )}
    </>
  );
}
