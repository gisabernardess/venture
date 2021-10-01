import { useAuth } from '../../contexts/AuthContext';
import { Flex, Stack } from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiHomeAlt, BiUser, BiGroup, BiLogOut } from 'react-icons/bi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

import { NavLink } from './NavLink';
import { UserRole } from '../../models/enums';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

export function SidebarNav() {
  const { user, logout } = useAuth();
  const { isDrawer } = useSidebarDrawer();

  return (
    <Stack
      h="100%"
      align="center"
      borderRightWidth={isDrawer ? null : '1px'}
      borderRightColor={isDrawer ? null : 'blue.700'}
      pb="4"
    >
      <Flex direction="column" grow={1} justify="center">
        <NavLink icon={BiHomeAlt} href="/dashboard/1">
          Dashboard
        </NavLink>
        <NavLink icon={BiUser} href="/dashboard/profile/1">
          Profile
        </NavLink>
        <NavLink icon={HiOutlineChatAlt2} href="/dashboard/forum">
          Forum
        </NavLink>
        {user?.role === UserRole.ADMIN && (
          <NavLink icon={BiGroup} href="/dashboard/users">
            Permissions
          </NavLink>
        )}
        <NavLink icon={FaBook} href="/dashboard/guides">
          Guides
        </NavLink>
      </Flex>
      <NavLink icon={BiLogOut} href="/" onClick={() => logout()}>
        Log out
      </NavLink>
      <NavLink icon={AiOutlineQuestionCircle} href="/faq">
        FAQ
      </NavLink>
    </Stack>
  );
}
