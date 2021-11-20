import { useAuth } from '../../contexts/AuthContext';
import { Flex, Text, Box } from '@chakra-ui/react';
import { Avatar } from '../Avatar';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}

      <Avatar user={{ name: user?.name, avatarUrl: user?.avatarUrl }} />
    </Flex>
  );
}
