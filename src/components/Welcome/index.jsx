import React from "react";
import { styled } from "@mui/material/styles";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Paper, Stack } from "@mui/material";
const Welcome = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Stack spacing={2}>
      <Item
        style={{
          backgroundColor: "#00ab7f",
          color: "white",
          marginBottom: "15px",
          display: "flex",
          paddingRight: "12px",
          paddingLeft: "12px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ClearAllIcon />
        <h3>Welcome</h3>
      </Item>
    </Stack>
  );
};

export default Welcome;
