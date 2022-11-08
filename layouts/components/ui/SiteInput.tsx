import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  id: any;
  text: string;
  label: string;
  error: any;
  type: any;
  helperText: string;
  className: string;
  variant: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const SiteInput: React.VFC<Props> = React.memo(
  ({
    onChange,
    error,
    text,
    type,
    helperText,
    label,
    id,
    className,
    variant,
  }) => {
    return (
      <>
        <div>
          <label className="text-center my-4">{text}</label>
        </div>
        <TextField
          id={id}
          type={type}
          label={label}
          className={className}
          variant={variant}
          onChange={onChange}
          error={error}
          helperText={helperText}
        />
      </>
    );
  }
);
