import { Box, Icon, Stack, Center } from '@chakra-ui/react';
import { ElementType } from 'react';

interface CardProps {
  icon: {
    icon: ElementType;
    color: string;
  };
  title: string;
  description: string;
}

export function Card({ icon, title, description }: CardProps) {
  return (
    <Stack
      w="2xs"
      h="2xs"
      p="6"
      bg="blue.800"
      borderWidth="2px"
      borderColor="blue.700"
      borderRadius="lg"
      align="center"
      spacing={4}
    >
      <Icon as={icon.icon} fontSize="48" color={icon.color} />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {title}
      </Box>
      <Box d="flex" alignItems="center">
        {description}
      </Box>
    </Stack>
  );
}
