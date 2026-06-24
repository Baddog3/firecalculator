import NextLink from "next/link";
import type { AnchorHTMLAttributes, ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

function isInternalHref(href: LinkProps["href"]): href is string {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function withTrailingSlash(href: string): string {
  if (href === "/") {
    return "/";
  }

  return href.endsWith("/") ? href : `${href}/`;
}

export default function Link({ href, prefetch = false, ...props }: LinkProps) {
  if (isInternalHref(href)) {
    const { replace, scroll, shallow, passHref, legacyBehavior, ...anchorProps } = props;

    void replace;
    void scroll;
    void shallow;
    void passHref;
    void legacyBehavior;

    return (
      <a
        href={withTrailingSlash(href)}
        {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return <NextLink href={href} prefetch={prefetch} {...props} />;
}
