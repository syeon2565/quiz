import React from "react";
import { styled } from "@stitches/react";

interface ButtonProps {
  size?: "small" | "regular";
  children: string;
  buttonType?: "filled" | "outlined" | "disabled";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  size = "regular",
  children,
  buttonType = "filled",
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <Btn
      type="button"
      size={size}
      buttonType={buttonType}
      disabled={disabled}
      {...props}
    >
      {children}
    </Btn>
  );
};

const Btn = styled("button", {
  backgroundColor: "#BDD1FF",
  borderRadius: "6px",
  border: "none",
  padding: "10px 15px",
  cursor: "pointer",
  color: "#1b1b1b",

  variants: {
    size: {
      small: { width: "112px", fontSize: "14px" },
      regular: { width: "200px", fontSize: "30px" },
    },
    buttonType: {
      filled: {
        backgroundColor: "#E9D8FD",
        "&:hover": {
          backgroundColor: "#B794F4",
        },
      },
      outlined: {
        backgroundColor: "transparent",
        border: "1px solid #E9D8FD",
        padding: "9px 14px",
        "&:hover": {
          backgroundColor: "#f3e9ff",
        },
      },
      disabled: {
        backgroundColor: "#c6c6c6",
        cursor: "not-allowed",
        color: "#eaeaea",
      },
    },
  },
});
