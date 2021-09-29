import { useAuth } from '../../contexts/AuthContext';
import { Flex, Stack } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiHomeAlt, BiUser, BiGroup, BiLogOut } from 'react-icons/bi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

import { NavLink } from './NavLink';
import { Role } from '../../models/enums';

export function SidebarNav() {
  const { user } = useAuth();

  return (
    <Stack
      h="100%"
      align="center"
      borderRightWidth="1px"
      borderRightColor="blue.700"
      pb="4"
    >
      <Flex direction="column" grow={1} justify="center">
        <NavLink icon={BiHomeAlt} href="/dashboard/1" />
        <NavLink icon={BiUser} href="/dashboard/profile/1" />
        <NavLink icon={HiOutlineChatAlt2} href="/dashboard/forum" />
        {user?.role === Role.ADMIN && (
          <NavLink icon={BiGroup} href="/dashboard/permissions" />
        )}
        <NavLink icon={FaBook} href="/dashboard/guides" />
      </Flex>
      <NavLink icon={BiLogOut} href="/" />
      <NavLink icon={AiOutlineQuestionCircle} href="/faq" />
    </Stack>
  );
}
