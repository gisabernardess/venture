import Link from 'next/link';
import { Image, Link as ChakraLink, LinkProps } from '@chakra-ui/react';

interface LogoProps extends LinkProps {
  dark?: boolean;
}

export function Logo({ dark = false, ...rest }: LogoProps) {
  return (
    <Link href="/" passHref>
      <ChakraLink _focus={{ boxShadow: 'none' }} {...rest}>
        {dark ? (
          <Image src="images/logo-black.svg" alt="Venture" />
        ) : (
          <Image src="images/logo.svg" alt="Venture" />
        )}
      </ChakraLink>
    </Link>
  );
}
