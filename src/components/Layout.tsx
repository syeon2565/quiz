import { styled } from "@stitches/react";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren<{ dataTestid?: string }>> = ({
  dataTestid,
  children,
}) => {
  return <StyledLayout data-testid={dataTestid}>{children}</StyledLayout>;
};

const StyledLayout = styled("div", {
  width: "425px",
  margin: "0 auto",
  padding: "40px 0",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export default Layout;
