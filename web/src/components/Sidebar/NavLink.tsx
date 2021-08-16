import {
  Link as ChakraLink,
  Icon,
  LinkProps,
  Box,
  Flex,
} from '@chakra-ui/react';
import { ElementType } from 'react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  href: string;
}

export function NavLink({ icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Flex
          w="48px"
          h="48px"
          align="center"
          justify="center"
          borderRadius="4"
          _hover={{ bg: 'blue.400' }}
        >
          <Icon as={icon} fontSize="25" />
        </Flex>
      </ChakraLink>
    </ActiveLink>
  );
}
