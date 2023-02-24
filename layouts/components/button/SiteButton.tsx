import { DOMAttributes, FC, memo, ReactNode } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

type SiteButtonProps = {
  href: string;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  // children: React.ReactNode;
  text: string;
  className: string;
  disabled?: boolean;
};

// eslint-disable-next-line react/display-name
export const SiteButton: React.VFC<SiteButtonProps> = memo(
  ({ href, onClick, text, className, disabled }) => {
    return (
      <div className={className}>
        <Link href={href}>
          <Button
            variant="outlined"
            onClick={onClick}
            disabled={disabled}
            type="submit"
          >
            {text}
          </Button>
        </Link>
      </div>
    );
  }
);

SiteButton.displayName = "SiteButton";
