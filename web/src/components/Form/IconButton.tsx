import { ElementType } from 'react';
import { Button, Icon } from '@chakra-ui/react';

type Icon = {
  icon: ElementType;
  color?: string;
  fontSize?: string;
};

interface IconButtonProps {
  variant?: string;
  href: string;
  icon: Icon;
}

export function IconButton({
  variant = 'unstyled',
  href,
  icon,
}: IconButtonProps) {
  return (
    <Button
      as="a"
      variant={variant}
      href={href}
      target="_blank"
      alignContent="center"
    >
      <Icon
        as={icon.icon}
        fontSize={icon.fontSize ?? '25'}
        color={icon.color ?? 'white'}
        _hover={{ color: 'red.500' }}
      />
    </Button>
  );
}
