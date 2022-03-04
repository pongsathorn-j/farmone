import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { Box, CssBaseline } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
