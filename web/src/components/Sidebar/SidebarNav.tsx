import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';

export function SidebarNav() {
  return (
    <Stack align="center" justify="center" h="100%">
      <NavLink icon={RiDashboardLine} href="/dashboard" />
      <NavLink icon={RiContactsLine} href="/users" />
      <NavLink icon={RiInputMethodLine} href="/forms" />
      <NavLink icon={RiGitMergeLine} href="/automation" />
    </Stack>
  );
}
