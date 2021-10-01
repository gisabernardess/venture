import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  page: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  page,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        disabled
        _disabled={{
          color: 'blue.400',
          bg: 'gray.200',
          cursor: 'default',
        }}
      >
        {page}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: 'gray.500',
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}
