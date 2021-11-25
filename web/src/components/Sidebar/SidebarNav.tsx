import { useAuth } from '../../contexts/AuthContext';
import { Flex, Stack } from '@chakra-ui/react';
import { FiBook } from 'react-icons/fi';
import { AiOutlineQuestionCircle, AiOutlineLineChart } from 'react-icons/ai';
import { BiHomeAlt, BiUser, BiGroup, BiLogOut } from 'react-icons/bi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

import { NavLink } from './NavLink';
import { UserRole } from '../../models/enums';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

export function SidebarNav() {
  const { user, logout } = useAuth();
  const { isDrawer } = useSidebarDrawer();

  const isNotPlayer = user?.role !== UserRole.PLAYER;

  return (
    <Stack
      h="100%"
      align="center"
      borderRightWidth={isDrawer ? null : '1px'}
      borderRightColor={isDrawer ? null : 'blue.700'}
      pb="4"
    >
      <Flex direction="column" grow={1} justify="center">
        <NavLink icon={BiHomeAlt} href={`/dashboard/${user?.id}`}>
          Dashboard
        </NavLink>
        <NavLink icon={BiUser} href={`/dashboard/profile/${user?.id}`}>
          Profile
        </NavLink>
        <NavLink icon={HiOutlineChatAlt2} href="/dashboard/forum">
          Forum
        </NavLink>
        <NavLink icon={FiBook} href="/dashboard/posts">
          Guides
        </NavLink>
        {isNotPlayer && (
          <>
            <NavLink icon={BiGroup} href="/dashboard/users">
              Users
            </NavLink>
            <NavLink icon={AiOutlineLineChart} href="/dashboard/statistics">
              Statistics
            </NavLink>
          </>
        )}
      </Flex>
      <NavLink icon={BiLogOut} href="/" onClick={() => logout()}>
        Log out
      </NavLink>
      <NavLink icon={AiOutlineQuestionCircle} href="/dashboard/faq">
        FAQ
      </NavLink>
    </Stack>
  );
}
