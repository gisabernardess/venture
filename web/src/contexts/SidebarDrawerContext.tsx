import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  useDisclosure,
  UseDisclosureReturn,
  useBreakpointValue,
} from '@chakra-ui/react';

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn & {
  isDrawer: boolean;
};

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  const isDrawer = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={{ ...disclosure, isDrawer }}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
