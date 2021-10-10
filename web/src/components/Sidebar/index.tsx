import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Box, Drawer } from '@chakra-ui/react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { isOpen, onClose, isDrawer } = useSidebarDrawer();

  if (isDrawer) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="blue.900" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="24" maxH="100%" bg="blue.800">
      <SidebarNav />
    </Box>
  );
}
