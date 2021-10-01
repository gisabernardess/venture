import { ElementType, ReactNode } from 'react';
import {
  Link as ChakraLink,
  Icon,
  LinkProps,
  Flex,
  Text,
} from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: ReactNode;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { isDrawer } = useSidebarDrawer();

  return (
    <ActiveLink href={href} passHref shouldMatchExactHref>
      <ChakraLink display="flex" align="center" {...rest}>
        {isDrawer ? (
          <Flex w="10rem" h="48px" align="center" justify="left">
            <Icon as={icon} fontSize="25" color="blue.400" />
            {isDrawer && (
              <Text ml="4" fontWeight="medium">
                {children}
              </Text>
            )}
          </Flex>
        ) : (
          <Flex
            w="48px"
            h="48px"
            align="center"
            justify="center"
            borderRadius="4"
            _hover={{ bg: 'gray.200' }}
          >
            <Icon as={icon} fontSize="25" />
            {isDrawer && (
              <Text ml="4" fontWeight="medium">
                {children}
              </Text>
            )}
          </Flex>
        )}
      </ChakraLink>
    </ActiveLink>
  );
}
