import * as React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Fab } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { MdExpandLess } from "react-icons/md";

const ScrollToTop = () => {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 34, right: 34 }}
      >
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <MdExpandLess />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
