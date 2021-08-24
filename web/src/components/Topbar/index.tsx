import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { FaDiceD20 } from 'react-icons/fa';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Notifications } from './Notifications';
import { Profile } from './Profile';

export function Topbar() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      mx="auto"
      px="6"
      align="center"
      bg="blue.800"
      borderBottomWidth="1px"
      borderBottomColor="blue.700"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      {isWideVersion && <Icon as={FaDiceD20} fontSize="48" color="red.500" />}
      <Flex align="center" ml="auto">
        <Notifications />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
