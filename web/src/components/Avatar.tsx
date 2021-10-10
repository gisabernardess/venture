import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { User } from '../models/types';

interface ProfileProps {
  user: Pick<User, 'name' | 'avatarUrl'>;
  size?: string;
}

export function Avatar({ user, size }: ProfileProps) {
  return (
    <ChakraAvatar size={size ?? 'md'} name={user?.name} src={user?.avatarUrl} />
  );
}
