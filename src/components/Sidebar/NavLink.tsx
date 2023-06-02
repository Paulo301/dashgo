import { Link, LinkProps } from '@chakra-ui/next-js';
import { Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavLinkProps extends LinkProps {
  icon: IconType;
  children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link
      display='flex'
      alignItems='center'
      {...rest}
    >
      <Icon as={icon} fontSize='20' />
      <Text
        ml='4'
        fontWeight='medium'
      >
        {children}
      </Text>
    </Link>
  );
}