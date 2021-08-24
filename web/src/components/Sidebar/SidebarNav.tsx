import { Flex, Stack } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiHomeAlt, BiUser, BiGroup } from 'react-icons/bi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

import { NavLink } from './NavLink';

export function SidebarNav() {
  return (
    <Stack
      h="100%"
      align="center"
      borderRightWidth="1px"
      borderRightColor="blue.700"
    >
      <Flex direction="column" grow={1} justify="center">
        <NavLink icon={BiHomeAlt} href="/dashboard" />
        <NavLink icon={BiUser} href="/dashboard/profile" />
        <NavLink icon={HiOutlineChatAlt2} href="/dashboard/forum" />
        <NavLink icon={BiGroup} href="/dashboard/permissions" />
        <NavLink icon={FaBook} href="/dashboard/guides" />
      </Flex>
      <NavLink icon={FiSettings} href="/settings" />
      <NavLink icon={AiOutlineQuestionCircle} href="/faq" />
    </Stack>
  );
}
