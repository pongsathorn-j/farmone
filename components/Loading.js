import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    </div>
  );
};

export default Loading;
