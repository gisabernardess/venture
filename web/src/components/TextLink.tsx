import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

interface TextLinkProps {
  label: string;
  href: string;
}

export function TextLink({ label, href }: TextLinkProps) {
  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        size="xs"
        variant="link"
        color="gray.400"
        mt="2"
        fontWeight="light"
      >
        {label}
      </Button>
    </NextLink>
  );
}
