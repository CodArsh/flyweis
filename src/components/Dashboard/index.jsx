import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { dashboard_details } from "../../constants/data";
import Welcome from "../Welcome";

const Dashboard_Data = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Welcome />
      <Grid container spacing={2}>
        {dashboard_details?.map((item, index) => (
          <Grid key={index} item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Paper
              style={{
                padding: "20px",
                background: item?.bgcolor,
                marginTop: "5px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <Typography>{item?.name}</Typography>
                <Typography variant="body1">{item?.quantity}</Typography>
              </span>
              <span
                style={{
                  backgroundColor: "white",
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item?.icon}
              </span>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard_Data;
