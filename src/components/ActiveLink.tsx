import { Link, LinkProps } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import { ReactElement } from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement | ReactElement[];
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children , shouldMatchExactHref=false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if(shouldMatchExactHref && (rest.href === asPath || rest.as === asPath)) {
    isActive = true;
  }

  if(!shouldMatchExactHref && (
    asPath.startsWith(String(rest.href)) ||
    asPath.startsWith(String(rest.as))
  )) {
    isActive = true;
  }

  return (
    <Link
      color={isActive ? 'pink.400' : 'gray.50'}
      {...rest}
    >
      {children}
    </Link>
  );
}